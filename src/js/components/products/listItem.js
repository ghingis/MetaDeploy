// @flow

import * as React from 'react';
import Card from '@salesforce/design-system-react/components/card';
import { Link } from 'react-router-dom';

import routes from 'utils/routes';

import ProductIcon from 'components/products/icon';

import type { Product as ProductType } from 'products/reducer';

const ProductItem = ({ item }: { item: ProductType }) => (
  <Link
    to={routes.product_detail(item.id)}
    className="slds-text-link_reset
      slds-p-around_small
      slds-size_1-of-1
      slds-medium-size_1-of-2
      slds-large-size_1-of-3"
  >
    <Card heading={item.title} icon={<ProductIcon item={item} />}>
      <div className="slds-card__body_inner">
        <div className="slds-text-title">Version {item.version}</div>
        <p className="slds-truncate">{item.description}</p>
      </div>
    </Card>
  </Link>
);

export default ProductItem;
