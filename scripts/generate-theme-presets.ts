/**
 * Script: generate-theme-presets.ts
 *
 * This script scans CSS files for theme definitions from two sources:
 * 1. /themes/ - External themes using :root/.dark format (converted to our format)
 * 2. /src/styles/presets/ - Internal themes using [data-theme-preset] format
 *
 * It parses @preset, @category, @description metadata from JSDoc comments and extracts CSS variables.
 *
 * Output:
 * 1. Converts /themes/*.css to /src/styles/presets/*.css format
 * 2. Updates /src/types/preferences/theme-lab.ts with generated preset metadata
 * 3. Creates /src/lib/theme-lab/generated-presets.ts with preset registry
 * 4. Updates /src/styles/presets/index.css with imports
 *
 * Usage:
 * - During local development, run manually after adding any new theme preset:
 *     pnpm generate:presets
 * - CSS files should include metadata comments (@preset, @category, @description)
 * - This generation step is automated using a Husky pre-push hook.
 */
import fs from 'node:fs';
import path from 'node:path';

// --- Types ---
interface ThemePresetStyles {
  [key: string]: string;
}

interface ThemePresetMeta {
  id: string;
  label: string;
  category: 'core' | 'community';
  description: string;
  primary: { light: string; dark: string };
  cssFile: string;
}

interface ParsedPreset extends ThemePresetMeta {
  styles: {
    light: ThemePresetStyles;
    dark: ThemePresetStyles;
  };
}

// --- Paths ---
const externalThemesDir = path.resolve(__dirname, '../themes');
const presetDir = path.resolve(__dirname, '../src/styles/presets');
const typesOutputPath = path.resolve(
  __dirname,
  '../src/types/preferences/theme-lab.ts'
);
const registryOutputPath = path.resolve(
  __dirname,
  '../src/lib/theme-lab/generated-presets.ts'
);
const globalStylesPath = path.resolve(__dirname, '../src/app/globals.css');
const presetIndexPath = path.resolve(__dirname, '../src/styles/presets/index.css');

// --- Helpers ---

/**
 * Convert filename to preset ID (kebab-case)
 */
function fileNameToId(fileName: string): string {
  return fileName.replace('.css', '');
}

/**
 * Convert kebab-case to Title Case
 */
function kebabToTitleCase(str: string): string {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Parse CSS variables from a CSS rule block
 */
function parseCssVariables(cssBlock: string): ThemePresetStyles {
  const variables: ThemePresetStyles = {};
  const varRegex = /--([a-z0-9-]+):\s*([^;]+);/gi;
  let match: RegExpExecArray | null = varRegex.exec(cssBlock);

  while (match !== null) {
    const [, name, value] = match;
    variables[name] = value.trim();
    match = varRegex.exec(cssBlock);
  }

  return variables;
}

/**
 * Parse metadata from CSS file JSDoc comment
 */
function parseMetadata(
  content: string,
  fileName: string
): { label: string; category: 'core' | 'community'; description: string } {
  const presetMatch = content.match(/@preset\s+(.+)/);
  const categoryMatch = content.match(/@category\s+(core|community)/);
  const descriptionMatch = content.match(/@description\s+(.+)/);

  const label = presetMatch?.[1]?.trim() ?? kebabToTitleCase(fileNameToId(fileName));
  const category = (categoryMatch?.[1]?.trim() as 'core' | 'community') ?? 'community';
  const description = descriptionMatch?.[1]?.trim() ?? '';

  return { label, category, description };
}

/**
 * Parse a CSS preset file
 */
function parsePresetFile(filePath: string, fileName: string): ParsedPreset | null {
  const content = fs.readFileSync(filePath, 'utf8');
  const id = fileNameToId(fileName);

  // Parse metadata
  const { label, category, description } = parseMetadata(content, fileName);

  // Parse light mode variables - :root[data-theme-preset="..."]
  const lightBlockMatch = content.match(
    /:root\[data-theme-preset="[^"]+"\]\s*\{([^}]+)\}/
  );

  // Parse dark mode variables - .dark[data-theme-preset="..."]
  const darkBlockMatch = content.match(
    /\.dark\[data-theme-preset="[^"]+"\]\s*\{([^}]+)\}/
  );

  if (!lightBlockMatch || !darkBlockMatch) {
    console.warn(`⚠️ Could not parse light/dark blocks in ${fileName}`);
    return null;
  }

  const lightStyles = parseCssVariables(lightBlockMatch[1]);
  const darkStyles = parseCssVariables(darkBlockMatch[1]);

  return {
    id,
    label,
    category,
    description,
    primary: {
      light: lightStyles.primary ?? '',
      dark: darkStyles.primary ?? ''
    },
    cssFile: fileName,
    styles: {
      light: lightStyles,
      dark: darkStyles
    }
  };
}

/**
 * Parse default theme from globals.css
 */
function parseDefaultTheme(): ParsedPreset {
  let globalContent = '';
  try {
    globalContent = fs.readFileSync(globalStylesPath, 'utf8');
  } catch (err) {
    console.error(`❌ Could not read globals.css at ${globalStylesPath}`);
    throw err;
  }

  // Parse :root block
  const rootBlockMatch = globalContent.match(/:root\s*\{([^}]+)\}/);
  // Parse .dark block
  const darkBlockMatch = globalContent.match(/\.dark\s*\{([^}]+)\}/);

  const lightStyles = rootBlockMatch ? parseCssVariables(rootBlockMatch[1]) : {};
  const darkStyles = darkBlockMatch ? parseCssVariables(darkBlockMatch[1]) : {};

  return {
    id: 'default',
    label: 'Default',
    category: 'core',
    description: 'System default theme',
    primary: {
      light: lightStyles.primary ?? '',
      dark: darkStyles.primary ?? ''
    },
    cssFile: 'globals.css',
    styles: {
      light: lightStyles,
      dark: darkStyles
    }
  };
}

/**
 * Parse an external theme file (from /themes directory)
 * These use :root { ... } .dark { ... } format
 */
function parseExternalTheme(filePath: string, fileName: string): ParsedPreset | null {
  const content = fs.readFileSync(filePath, 'utf8');
  const id = fileNameToId(fileName);

  // Parse metadata (if any)
  const { label, category, description } = parseMetadata(content, fileName);

  // Parse light mode variables - :root { ... }
  const lightBlockMatch = content.match(/:root\s*\{([^}]+)\}/);

  // Parse dark mode variables - .dark { ... }
  const darkBlockMatch = content.match(/\.dark\s*\{([^}]+)\}/);

  if (!lightBlockMatch) {
    console.warn(`⚠️ Could not parse :root block in ${fileName}`);
    return null;
  }

  const lightStyles = parseCssVariables(lightBlockMatch[1]);
  const darkStyles = darkBlockMatch ? parseCssVariables(darkBlockMatch[1]) : lightStyles;

  return {
    id,
    label,
    category: 'community', // External themes are always community
    description: description || `${label} theme`,
    primary: {
      light: lightStyles.primary ?? '',
      dark: darkStyles.primary ?? ''
    },
    cssFile: fileName,
    styles: {
      light: lightStyles,
      dark: darkStyles
    }
  };
}

/**
 * Convert an external theme to our [data-theme-preset] format
 */
function convertExternalTheme(preset: ParsedPreset): string {
  const lightVars = Object.entries(preset.styles.light)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join('\n');

  const darkVars = Object.entries(preset.styles.dark)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join('\n');

  return `/**
 * Theme: ${preset.label}
 * @preset ${preset.label}
 * @category community
 * @description ${preset.description}
 */

:root[data-theme-preset="${preset.id}"] {
${lightVars}
}

.dark[data-theme-preset="${preset.id}"] {
${darkVars}
}
`;
}

/**
 * Generate the presets index.css file
 */
function generatePresetsIndex(presetFiles: string[]): string {
  const imports = presetFiles
    .filter(f => f !== 'index.css')
    .map(f => `@import './${f}';`)
    .join('\n');

  return `/**
 * Theme Presets Index
 * AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * Run \`pnpm generate:presets\` to regenerate
 */

${imports}
`;
}

/**
 * Generate TypeScript code for preset registry
 */
function generateRegistryCode(presets: ParsedPreset[]): string {
  const corePresets = presets.filter((p) => p.category === 'core');
  const communityPresets = presets.filter((p) => p.category === 'community');

  return `/**
 * Generated Theme Presets Registry
 *
 * AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * Run \`pnpm generate:presets\` to regenerate
 *
 * Generated from CSS files in /src/styles/presets/
 */

import type { ThemeLabPreset } from '@/types/preferences/theme-lab';

export const corePresets: Record<string, ThemeLabPreset> = ${JSON.stringify(
    Object.fromEntries(
      corePresets.map((p) => [
        p.id,
        { label: p.label, category: p.category, description: p.description, styles: p.styles }
      ])
    ),
    null,
    2
  )};

export const communityPresets: Record<string, ThemeLabPreset> = ${JSON.stringify(
    Object.fromEntries(
      communityPresets.map((p) => [
        p.id,
        { label: p.label, category: p.category, description: p.description, styles: p.styles }
      ])
    ),
    null,
    2
  )};

/**
 * Get a preset by ID
 */
export function getPreset(id: string): ThemeLabPreset | undefined {
  return corePresets[id] ?? communityPresets[id];
}

/**
 * Get all presets
 */
export function getAllPresets(): Record<string, ThemeLabPreset> {
  return { ...corePresets, ...communityPresets };
}

/**
 * Get preset IDs by category
 */
export function getPresetIds(category?: 'core' | 'community'): string[] {
  if (category === 'core') return Object.keys(corePresets);
  if (category === 'community') return Object.keys(communityPresets);
  return [...Object.keys(corePresets), ...Object.keys(communityPresets)];
}
`;
}

/**
 * Generate preset metadata for types file
 */
function generateTypesCode(presets: ParsedPreset[]): string {
  const presetMetas = presets.map((p) => ({
    id: p.id,
    label: p.label,
    category: p.category,
    description: p.description,
    primary: p.primary
  }));

  return `// --- generated:themePresets:start ---

export const THEME_PRESET_OPTIONS = ${JSON.stringify(presetMetas, null, 2)} as const;

export const THEME_PRESET_VALUES = THEME_PRESET_OPTIONS.map((p) => p.id);

export type ThemePresetId = (typeof THEME_PRESET_OPTIONS)[number]["id"];

// --- generated:themePresets:end ---`;
}

// --- Main ---

async function main() {
  // Check preset directory exists
  if (!fs.existsSync(presetDir)) {
    console.log(`📁 Creating preset directory at: ${presetDir}`);
    fs.mkdirSync(presetDir, { recursive: true });
  }

  // Step 1: Process external themes (from /themes directory) and convert them
  let externalThemesConverted = 0;
  if (fs.existsSync(externalThemesDir)) {
    const externalFiles = fs.readdirSync(externalThemesDir)
      .filter((file) => file.endsWith('.css') && file !== 'default.css'); // Skip default.css as it comes from globals.css

    console.log(`\n📂 Found ${externalFiles.length} external theme files in /themes\n`);

    for (const file of externalFiles) {
      const externalPath = path.join(externalThemesDir, file);
      const targetPath = path.join(presetDir, file);

      // Skip if file already exists in presets (don't overwrite)
      if (fs.existsSync(targetPath)) {
        console.log(`⏭️ Skipping ${file} (already exists in presets)`);
        continue;
      }

      // Parse external theme
      const preset = parseExternalTheme(externalPath, file);
      if (preset) {
        // Convert and write to presets directory
        const convertedCss = convertExternalTheme(preset);
        fs.writeFileSync(targetPath, convertedCss);
        console.log(`✨ Converted ${file} → ${preset.label}`);
        externalThemesConverted++;
      }
    }

    if (externalThemesConverted > 0) {
      console.log(`\n✅ Converted ${externalThemesConverted} external themes\n`);
    }
  } else {
    console.log('ℹ️ No external themes directory found');
  }

  // Step 2: Get all CSS files from presets directory (excluding default.css since it's from globals.css)
  const files = fs.readdirSync(presetDir)
    .filter((file) => file.endsWith('.css') && file !== 'index.css' && file !== 'default.css');

  if (files.length === 0) {
    console.warn('⚠️ No preset CSS files found.');
  }

  console.log(`📂 Processing ${files.length} CSS preset files\n`);

  // Parse all preset files
  const presets: ParsedPreset[] = [];

  // Add default theme first
  try {
    const defaultPreset = parseDefaultTheme();
    presets.push(defaultPreset);
    console.log('✓ Parsed default theme from globals.css');
  } catch {
    console.error('❌ Failed to parse default theme');
    process.exit(1);
  }

  // Parse each CSS file
  for (const file of files) {
    const filePath = path.join(presetDir, file);
    const preset = parsePresetFile(filePath, file);
    if (preset) {
      presets.push(preset);
      console.log(`✓ Parsed ${file} → ${preset.label} (${preset.category})`);
    }
  }

  console.log(`\n📊 Total: ${presets.length} presets (${presets.filter((p) => p.category === 'core').length} core, ${presets.filter((p) => p.category === 'community').length} community)\n`);

  // Step 3: Generate presets index.css
  const allPresetFiles = fs.readdirSync(presetDir)
    .filter((file) => file.endsWith('.css') && file !== 'index.css')
    .sort();

  const presetsIndexContent = generatePresetsIndex(allPresetFiles);
  fs.writeFileSync(presetIndexPath, presetsIndexContent);
  console.log(`✅ Generated ${presetIndexPath}`);

  // Step 4: Generate registry file
  const registryCode = generateRegistryCode(presets);
  fs.writeFileSync(registryOutputPath, registryCode);
  console.log(`✅ Generated ${registryOutputPath}`);

  // Step 5: Update types file with generated section
  const typesContent = fs.readFileSync(typesOutputPath, 'utf8');
  const generatedBlock = generateTypesCode(presets);

  let updatedTypes: string;
  if (typesContent.includes('// --- generated:themePresets:start ---')) {
    // Replace existing generated block
    updatedTypes = typesContent.replace(
      /\/\/ --- generated:themePresets:start ---[\s\S]*?\/\/ --- generated:themePresets:end ---/,
      generatedBlock
    );
  } else {
    // Append generated block
    updatedTypes = typesContent + '\n' + generatedBlock;
  }

  if (updatedTypes !== typesContent) {
    fs.writeFileSync(typesOutputPath, updatedTypes);
    console.log(`✅ Updated ${typesOutputPath}`);
  } else {
    console.log(`ℹ️ No changes in ${typesOutputPath}`);
  }

  console.log('\n🎉 Theme preset generation complete!');
}

main().catch((err) => {
  console.error('❌ Unexpected error while generating theme presets:', err);
  process.exit(1);
});
