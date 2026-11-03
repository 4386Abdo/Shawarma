import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateSubtotal,
  calculateDeliveryFee,
  calculateOrderTotal,
  formatEgyptianCurrency,
  isValidEgyptianPhone,
  normalizePhoneForCalling
} from './orderCalculations';

test('calculateSubtotal handles empty array and positive quantities', () => {
  assert.equal(calculateSubtotal([]), 0);
  assert.equal(
    calculateSubtotal([
      { price: 65, quantity: 2 },
      { price: 195, quantity: 1 }
    ]),
    325
  );
});

test('calculateDeliveryFee is 0 for takeaway and applied for delivery', () => {
  assert.equal(calculateDeliveryFee('takeaway', 20), 0);
  assert.equal(calculateDeliveryFee('delivery', 20), 20);
});

test('calculateOrderTotal correctly sums subtotal and delivery fee', () => {
  assert.equal(calculateOrderTotal(325, 0), 325);
  assert.equal(calculateOrderTotal(325, 20), 345);
});

test('formatEgyptianCurrency outputs correct symbol for Arabic and English', () => {
  assert.equal(formatEgyptianCurrency(150, 'ar'), '150 ج.م');
  assert.equal(formatEgyptianCurrency(150, 'en'), '150 EGP');
});

test('isValidEgyptianPhone validates standard Egyptian mobile prefixes', () => {
  assert.equal(isValidEgyptianPhone('01113914564'), true);
  assert.equal(isValidEgyptianPhone('+201113914564'), true);
  assert.equal(isValidEgyptianPhone('01012345678'), true);
  assert.equal(isValidEgyptianPhone('01212345678'), true);
  assert.equal(isValidEgyptianPhone('01512345678'), true);
  assert.equal(isValidEgyptianPhone('12345'), false);
  assert.equal(isValidEgyptianPhone('01312345678'), false);
});

test('normalizePhoneForCalling cleans up Egyptian phone numbers', () => {
  assert.equal(normalizePhoneForCalling('01113914564'), '+201113914564');
  assert.equal(normalizePhoneForCalling('+201113914564'), '+201113914564');
});
