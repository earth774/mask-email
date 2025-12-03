# @amiearth/mask-email

A lightweight, zero-dependency TypeScript library for masking email addresses to protect user privacy. Perfect for displaying emails in logs, UI components, or any scenario where you need to hide sensitive information.

## Features

- 🎯 **Simple API** - Easy to use with minimal configuration
- 🔒 **Privacy-focused** - Protect user email addresses from exposure
- 📦 **Zero dependencies** - Lightweight and fast
- 🎨 **Customizable** - Configure mask character and visible characters
- 📝 **TypeScript** - Full TypeScript support with type definitions
- ✅ **Well tested** - Comprehensive test coverage

## Installation

```bash
npm install @amiearth/mask-email
```

```bash
yarn add @amiearth/mask-email
```

```bash
pnpm add @amiearth/mask-email
```

## Usage

### Basic Usage

```typescript
import { maskEmail } from '@amiearth/mask-email';

// Default masking (shows first 2 characters)
maskEmail('johndoe@gmail.com');
// Returns: 'jo*******@gmail.com'
```

### Custom Options

```typescript
import { maskEmail } from '@amiearth/mask-email';

// Custom mask character
maskEmail('johndoe@gmail.com', { maskChar: '#' });
// Returns: 'jo#######@gmail.com'

// Show more characters
maskEmail('johndoe@gmail.com', { visibleStart: 3 });
// Returns: 'joh******@gmail.com'

// Combine options
maskEmail('johndoe@gmail.com', { maskChar: '•', visibleStart: 4 });
// Returns: 'john•••••@gmail.com'
```

## API

### `maskEmail(email: string, options?: MaskOptions): string`

Masks an email address by hiding part of the local part (before @) while keeping the domain visible.

#### Parameters

- `email` (string, required) - The email address to mask
- `options` (MaskOptions, optional) - Configuration options

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `maskChar` | `string` | `'*'` | Character used for masking |
| `visibleStart` | `number` | `2` | Number of characters to show at the start of the local part |

#### Returns

- `string` - The masked email address

#### Examples

```typescript
// Standard email
maskEmail('alice@example.com');
// 'al****@example.com'

// Short email (shows only first character)
maskEmail('ab@test.com');
// 'a*@test.com'

// Invalid email (returns as-is)
maskEmail('notanemail');
// 'notanemail'

maskEmail('');
// ''
```

## Use Cases

- **Logging**: Mask emails in application logs
- **UI Display**: Show partial emails in user interfaces
- **Error Messages**: Display emails in error messages without exposing full addresses
- **Debugging**: Protect user privacy during development

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

