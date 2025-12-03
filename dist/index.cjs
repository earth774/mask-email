"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  maskEmail: () => maskEmail
});
module.exports = __toCommonJS(index_exports);
function maskEmail(email, options = {}) {
  const { maskChar = "*", visibleStart = 2 } = options;
  if (!email || !email.includes("@")) {
    return email;
  }
  const parts = email.split("@");
  const localPart = parts[0];
  const domain = parts[1];
  if (!localPart || !domain) {
    return email;
  }
  if (localPart.length <= visibleStart) {
    return `${localPart[0]}${maskChar.repeat(localPart.length - 1)}@${domain}`;
  }
  const visiblePart = localPart.substring(0, visibleStart);
  const maskedLength = localPart.length - visibleStart + 2;
  const maskedPart = maskChar.repeat(maskedLength);
  return `${visiblePart}${maskedPart}@${domain}`;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  maskEmail
});
