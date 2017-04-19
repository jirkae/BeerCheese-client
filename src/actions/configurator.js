import { CONFIGURATOR } from '../reducers/index';
import { defaultDispatch, ommitState } from './common';

const defaultDispatchConfigurator = (payload, reducer = ommitState) => {
  defaultDispatch(CONFIGURATOR, payload, reducer);
}

/* Action creators */

export const addProduct = ( product, currentProducts ) => {
    //let newProducts = currentProducts.slice(0);
    currentProducts.push(product);
    console.log(currentProducts);
  defaultDispatchConfigurator({
    products: currentProducts
  });
};
