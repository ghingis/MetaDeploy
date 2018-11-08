import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from 'react-testing-library';

import { shouldFetchVersion, gatekeeper } from 'products/utils';

const defaultProduct = {
  id: 'p1',
  slug: 'product-1',
  title: 'Product 1',
  description: 'This is a test product.',
  category: 'salesforce',
  image: null,
  most_recent_version: {
    id: 'v1',
    product: 'p1',
    label: '1.0.0',
    description: 'This is a test product version.',
    primary_plan: {
      id: 'plan-1',
      slug: 'my-plan',
      title: 'My Plan',
    },
    secondary_plan: null,
    additional_plans: [],
  },
};

describe('shouldFetchVersion', () => {
  describe('no product', () => {
    test('return false', () => {
      const actual = shouldFetchVersion({ product: null });

      expect(actual).toBe(false);
    });
  });

  describe('no version, already fetched', () => {
    test('returns false', () => {
      const product = {
        ...defaultProduct,
        versions: { '2.0.0': null },
      };
      const actual = shouldFetchVersion({
        product,
        version: null,
        versionLabel: '2.0.0',
      });

      expect(actual).toBe(false);
    });
  });

  describe('version not yet fetched', () => {
    test('returns true', () => {
      const product = {
        ...defaultProduct,
        versions: { '2.0.0': 'not null' },
      };
      const actual = shouldFetchVersion({
        product,
        version: null,
        versionLabel: '2.0.0',
      });

      expect(actual).toBe(true);
    });
  });
});

describe('gatekeeper', () => {
  const setup = opts => {
    const { getByText } = render(
      <MemoryRouter>{gatekeeper(opts)}</MemoryRouter>,
    );
    return { getByText };
  };

  describe('no product', () => {
    test('renders <ProductNotFound />', () => {
      const { getByText } = setup({ product: null });

      expect(getByText('list of all products')).toBeVisible();
    });
  });

  describe('no version, already fetched', () => {
    test('renders <VersionNotFound />', () => {
      const product = {
        ...defaultProduct,
        versions: { '2.0.0': null },
      };
      const { getByText } = setup({
        product,
        version: null,
        versionLabel: '2.0.0',
      });

      expect(getByText('most recent version')).toBeVisible();
    });
  });

  describe('version not yet fetched', () => {
    test('renders <Spinner />', () => {
      const product = {
        ...defaultProduct,
        versions: { '2.0.0': 'not null' },
      };
      const { getByText } = setup({
        product,
        version: null,
        versionLabel: '2.0.0',
      });

      expect(getByText('Loading...')).toBeVisible();
    });
  });

  describe('no plan', () => {
    test('renders <PlanNotFound />', () => {
      const { getByText } = setup({
        product: defaultProduct,
        version: defaultProduct.most_recent_version,
        plan: null,
      });

      expect(getByText('another plan')).toBeVisible();
    });

    describe('no version', () => {
      test('renders <VersionNotFound />', () => {
        const { getByText } = setup({
          product: defaultProduct,
          plan: null,
        });

        expect(getByText('most recent version')).toBeVisible();
      });
    });
  });
});
