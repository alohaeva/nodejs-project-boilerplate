import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';

import { AddTimeTypes, getTimeStamp, addTime, isDateBefore } from '../../../utils/dates/index.ts';

describe('should test getTimeStamp function', () => {
  it('should test AddTimeTypes.Day type', () => {
    const actualTimestamp = getTimeStamp({
      type: AddTimeTypes.Day,
      value: 2,
    });

    expect(actualTimestamp).toEqual(172800000);
  });

  it('should test AddTimeTypes.Second type', () => {
    const actualTimestamp = getTimeStamp({
      type: AddTimeTypes.Second,
      value: 2,
    });

    expect(actualTimestamp).toEqual(2000);
  });

  it('should test AddTimeTypes.Hour type', () => {
    const actualTimestamp = getTimeStamp({
      type: AddTimeTypes.Hour,
      value: 2,
    });

    expect(actualTimestamp).toEqual(7200000);
  });

  it('should test AddTimeTypes.Minute type', () => {
    const actualTimestamp = getTimeStamp({
      type: AddTimeTypes.Minute,
      value: 2,
    });

    expect(actualTimestamp).toEqual(120000);
  });

  it('should test AddTimeTypes.Week type', () => {
    const actualTimestamp = getTimeStamp({
      type: AddTimeTypes.Week,
      value: 2,
    });

    expect(actualTimestamp).toEqual(1209600000);
  });

  it('should test AddTimeTypes.Month type', () => {
    const actualTimestamp = getTimeStamp({
      type: AddTimeTypes.Month,
      value: 2,
    });

    expect(actualTimestamp).toEqual(36288000000);
  });

  it('should test AddTimeTypes.Year type', () => {
    const actualTimestamp = getTimeStamp({
      type: AddTimeTypes.Year,
      value: 2,
    });

    expect(actualTimestamp).toEqual(435456000000);
  });
});

describe('should test addTime function', () => {
  beforeAll(() => {
    vi.setSystemTime(new Date(2024, 0, 23));
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  it('should test add year timestamp', () => {
    const actualTimestamp = addTime(Date.now(), {
      years: 2,
    });

    const date = new Date(actualTimestamp);

    const year = date.getFullYear();

    expect(year).toEqual(2026);
  });

  it('should test add month timestamp', () => {
    const actualTimestamp = addTime(Date.now(), {
      months: 2,
    });

    const date = new Date(actualTimestamp);

    const month = date.getMonth();

    expect(month).toEqual(2);
  });

  it('should test add week timestamp', () => {
    const actualTimestamp = addTime(Date.now(), {
      weeks: 3,
    });

    const date = new Date(actualTimestamp);

    const day = date.getDate();

    expect(day).toEqual(13);
  });

  it('should test add week timestamp', () => {
    const actualTimestamp = addTime(Date.now(), {
      days: 11,
    });

    const date = new Date(actualTimestamp);

    const day = date.getDate();

    expect(day).toEqual(3);
  });
});

describe('should test isDateBefore function', () => {
  beforeAll(() => {
    vi.setSystemTime(new Date(2024, 0, 23));
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  it('should test date before', () => {
    const actualTimestamp = addTime(Date.now(), {
      days: 11,
    });

    const date = new Date(actualTimestamp);

    const result = isDateBefore(Date.now(), date);

    expect(result).toBeTruthy();
  });

  it('should test date after', () => {
    const actualTimestamp = addTime(Date.now(), {
      months: 3,
    });

    const date = new Date(actualTimestamp);

    const result = isDateBefore(date, Date.now());

    expect(result).toBeFalsy();
  });

  it('should test equal date', () => {
    const result = isDateBefore(Date.now(), Date.now());

    expect(result).toBeFalsy();
  });
});
