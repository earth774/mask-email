// src/index.test.ts
import { describe, it, expect } from 'vitest';
import { maskEmail } from '../index.js';

describe('maskEmail', () => {
  describe('basic functionality', () => {
    it('should mask standard email correctly', () => {
      expect(maskEmail('johndoe@gmail.com')).toBe('jo*******@gmail.com');
    });

    it('should mask email with different domain', () => {
      expect(maskEmail('alice@example.com')).toBe('al*****@example.com');
    });

    it('should preserve domain part', () => {
      const result = maskEmail('user@company.co.uk');
      expect(result).toContain('@company.co.uk');
      expect(result).toMatch(/^.{2}\*+@company\.co\.uk$/);
    });
  });

  describe('custom mask character', () => {
    it('should handle custom mask character', () => {
      expect(maskEmail('johndoe@gmail.com', { maskChar: '#' }))
        .toBe('jo#######@gmail.com');
    });

    it('should handle custom mask character with different symbol', () => {
      expect(maskEmail('johndoe@gmail.com', { maskChar: '•' }))
        .toBe('jo•••••••@gmail.com');
    });

    it('should handle custom mask character with dot', () => {
      expect(maskEmail('johndoe@gmail.com', { maskChar: '.' }))
        .toBe('jo.......@gmail.com');
    });

    it('should handle custom mask character with space', () => {
      expect(maskEmail('johndoe@gmail.com', { maskChar: ' ' }))
        .toBe('jo       @gmail.com');
    });
  });

  describe('custom visibleStart', () => {
    it('should show more characters when visibleStart is increased', () => {
      expect(maskEmail('johndoe@gmail.com', { visibleStart: 3 }))
        .toBe('joh******@gmail.com');
    });

    it('should show 4 characters when visibleStart is 4', () => {
      expect(maskEmail('johndoe@gmail.com', { visibleStart: 4 }))
        .toBe('john*****@gmail.com');
    });

    it('should show 1 character when visibleStart is 1', () => {
      expect(maskEmail('johndoe@gmail.com', { visibleStart: 1 }))
        .toBe('j********@gmail.com');
    });

    it('should handle visibleStart equal to local part length', () => {
      expect(maskEmail('ab@test.com', { visibleStart: 2 }))
        .toBe('a*@test.com');
    });

    it('should handle visibleStart greater than local part length', () => {
      expect(maskEmail('ab@test.com', { visibleStart: 5 }))
        .toBe('a*@test.com');
    });
  });

  describe('combining options', () => {
    it('should combine custom mask character and visibleStart', () => {
      expect(maskEmail('johndoe@gmail.com', { maskChar: '•', visibleStart: 4 }))
        .toBe('john•••••@gmail.com');
    });

    it('should combine custom mask character and visibleStart with different values', () => {
      expect(maskEmail('alice@example.com', { maskChar: '#', visibleStart: 3 }))
        .toBe('ali####@example.com');
    });
  });

  describe('short emails', () => {
    it('should handle 2-character local part', () => {
      expect(maskEmail('ab@test.com')).toBe('a*@test.com');
    });

    it('should handle 1-character local part', () => {
      expect(maskEmail('a@test.com')).toBe('a@test.com');
    });

    it('should handle short email with custom visibleStart', () => {
      expect(maskEmail('ab@test.com', { visibleStart: 1 }))
        .toBe('a***@test.com');
    });
  });

  describe('edge cases', () => {
    it('should return empty string for empty input', () => {
      expect(maskEmail('')).toBe('');
    });

    it('should return invalid email as-is when no @ symbol', () => {
      expect(maskEmail('notanemail')).toBe('notanemail');
    });

    it('should return invalid email as-is when only @ symbol', () => {
      expect(maskEmail('@')).toBe('@');
    });

    it('should return email as-is when no local part', () => {
      expect(maskEmail('@domain.com')).toBe('@domain.com');
    });

    it('should return email as-is when no domain', () => {
      expect(maskEmail('user@')).toBe('user@');
    });

    it('should handle email with multiple @ symbols (processes first @ only)', () => {
      // Note: Function splits by first @ only, treating rest as domain
      const result = maskEmail('user@domain@test.com');
      expect(result).toBe('us****@domain');
    });
  });

  describe('different email lengths', () => {
    it('should handle very short email', () => {
      expect(maskEmail('a@b.co')).toBe('a@b.co');
    });

    it('should handle medium length email', () => {
      expect(maskEmail('username@example.com')).toBe('us********@example.com');
    });

    it('should handle long email', () => {
      const longEmail = 'verylongusername@example.com';
      const result = maskEmail(longEmail);
      expect(result).toMatch(/^ve\*+@example\.com$/);
      expect(result).toContain('@example.com');
    });
  });

  describe('special characters in email', () => {
    it('should handle email with numbers', () => {
      expect(maskEmail('user123@gmail.com')).toBe('us*******@gmail.com');
    });

    it('should handle email with dots in local part', () => {
      expect(maskEmail('user.name@gmail.com')).toBe('us*********@gmail.com');
    });

    it('should handle email with plus sign', () => {
      expect(maskEmail('user+tag@gmail.com')).toBe('us********@gmail.com');
    });

    it('should handle email with underscores', () => {
      expect(maskEmail('user_name@gmail.com')).toBe('us*********@gmail.com');
    });
  });

  describe('default behavior', () => {
    it('should use asterisk as default mask character', () => {
      expect(maskEmail('test@example.com')).toBe('te****@example.com');
    });

    it('should use 2 as default visibleStart', () => {
      expect(maskEmail('test@example.com')).toBe('te****@example.com');
    });

    it('should work with empty options object', () => {
      expect(maskEmail('test@example.com', {})).toBe('te****@example.com');
    });
  });
});