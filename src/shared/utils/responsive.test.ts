import { Dimensions } from 'react-native';
import { scaleFont, scaleHeight, scaleWidth } from './responsive';

describe('Responsive Layout Scaling', () => {
  const originalDimensions = Dimensions.get('window');

  afterEach(() => {
    Dimensions.set({ window: originalDimensions, screen: originalDimensions });
  });

  it('calculates 1:1 values on standard baseline dimensions (375x812)', () => {
    Dimensions.set({
      window: { width: 375, height: 812, scale: 1, fontScale: 1 },
      screen: { width: 375, height: 812, scale: 1, fontScale: 1 },
    });

    expect(scaleWidth(100)).toBeCloseTo(100, 0);
    expect(scaleHeight(100)).toBeCloseTo(100, 0);
    expect(scaleFont(16)).toBeCloseTo(16, 0);
  });

  it('scales values proportionally on larger screens', () => {
    Dimensions.set({
      window: { width: 750, height: 1624, scale: 2, fontScale: 1 },
      screen: { width: 750, height: 1624, scale: 2, fontScale: 1 },
    });

    expect(scaleWidth(100)).toBeGreaterThan(100);
    expect(scaleHeight(100)).toBeGreaterThan(100);
    expect(scaleFont(16)).toBeGreaterThan(16);
  });
});
