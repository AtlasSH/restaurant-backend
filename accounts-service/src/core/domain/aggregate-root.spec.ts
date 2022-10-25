import { AggregateRoot } from './aggregate-root';

type CustomAggregateProps = Record<string, string>;

class CustomAggregate extends AggregateRoot<CustomAggregateProps> {}

describe('Domain - AggregateRoot', () => {
  it('should generate an aggregate', () => {
    const entity = new CustomAggregate({});

    expect(entity.id).toBeTruthy();
    expect(entity.props).toEqual({
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
});
