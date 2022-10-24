import { left, Left, right, Right, combine } from './either';

describe('Logic - Either', () => {
  it('Left class should be understood as left', () => {
    const left = new Left('any_value');

    expect(left.value).toBe('any_value');
    expect(left.isLeft()).toBeTruthy();
    expect(left.isRight()).toBeFalsy();
  });

  it('Right class should be understood as right', () => {
    const right = new Right('any_value');

    expect(right.value).toBe('any_value');
    expect(right.isLeft()).toBeFalsy();
    expect(right.isRight()).toBeTruthy();
  });

  it('left method should return a Left instance of left method', () => {
    const leftReturn = left('any_value');

    expect(leftReturn).toBeInstanceOf(Left);
  });

  it('right method should return a Right instance of right method', () => {
    const rightReturn = right('any_value');

    expect(rightReturn).toBeInstanceOf(Right);
  });

  it('combine method should return a Left instance if has an left method', () => {
    const leftReturn = left('left_value');
    const rightReturn = right('right_value');

    const combined = combine([leftReturn, rightReturn]);

    expect(combined).toBeInstanceOf(Left);
    expect(combined.value).toBe('left_value');
  });

  it('combine method should return a Right instance if has only right methods', () => {
    const rightReturnOne = right('right_value_one');
    const rightReturnTwo = right('right_value_two');

    const combined = combine([rightReturnOne, rightReturnTwo]);

    expect(combined).toBeInstanceOf(Right);
  });
});
