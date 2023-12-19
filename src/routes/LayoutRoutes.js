import React, { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import App from '../components/app'
import Datatable from '../components/common/datatable'
import Createcoupons from '../components/coupons/create-coupons'
import ListCoupons from '../components/coupons/list-coupons'
import Dashboard from '../components/dashboard'
// import Invoice from '../components/invoice'
import Rates from '../components/localization/rates'
import Taxes from '../components/localization/taxes'
import Translations from '../components/localization/translations'
import Media from '../components/media/media'
import Createmenu from '../components/menus/create-menu'
import Listmenu from '../components/menus/list-menu'
import Createpage from '../components/pages/create-page'
import ListPages from '../components/pages/list-page'

import Stock from '../components/stock'


import Addproduct from '../components/products/physical/add-product'
import Availability from '../components/products/physical/Availability'
import Category from '../components/products/physical/category'
import Edit_product from '../components/products/physical/edit-product'
import Header from '../components/products/physical/header'
import Productdetail from '../components/products/physical/product-detail'
import Productlist from '../components/products/physical/product-list'
import Subcategory from '../components/products/physical/sub-category'
import Reports from '../components/reports/report'
import Orders from '../components/sales/orders'
import Transactionsales from '../components/sales/transactions-sales'
import Banner from '../components/settings/banner'
import Profile from '../components/settings/profile'
import Size from '../components/settings/size'
import Tax from '../components/settings/tax'
import Createuser from '../components/users/create-user'
import Listuser from '../components/users/list-user'
import Createvendors from '../components/vendors/create.vendors'
import Listvendors from '../components/vendors/list-vendors'
import Logo from '../components/settings/logo'
import TermsCondition from '../components/cms/termsConditions'
import AboutUs from '../components/cms/aboutUs'
import Address from '../components/cms/Address'
import ShopByExam from '../components/products/physical/ShopByExam'
import Faq from '../components/cms/Faq'
import Authors from '../components/cms/authors'
import MasterCategory from '../components/cms/masterCategory'

const LayoutRoutes = () => {
  return (
    <Fragment>
        <Routes>
            <Route element={<App />}>
			<Route path={`*`} element={<Dashboard />} />

			<Route
							path={`${process.env.PUBLIC_URL}/products/physical/availability`}
							element={<Availability />}
						/>
            <Route
							path={`${process.env.PUBLIC_URL}/dashboard`}
							element={<Dashboard />}
						/>

						<Route
							path={`${process.env.PUBLIC_URL}/products/physical/category`}
							element={<Category />}
						/>
						<Route
							path={`${process.env.PUBLIC_URL}/products/physical/sub-category`}
							element={<Subcategory />}
						/>
						<Route
							path={`${process.env.PUBLIC_URL}/products/physical/product-list`}
							element={<Productlist />}
						/>
						<Route
							path={`${process.env.PUBLIC_URL}/products/physical/product-detail`}
							element={<Productdetail />}
						/>
						<Route
							path={`${process.env.PUBLIC_URL}/products/physical/Header`}
							element={<Header />}
						/>
						<Route
							path={`${process.env.PUBLIC_URL}/products/physical/add-product`}
							element={<Addproduct />}
						/>

						<Route
							path={`${process.env.PUBLIC_URL}/products/physical/edit-product/:pid`}
							element={<Edit_product />}
						/>
<Route
							path={`${process.env.PUBLIC_URL}/stock/stock`}
							element={<Stock />}
						/>
						

						<Route
							path={`${process.env.PUBLIC_URL}/sales/orders`}
							element={<Orders />}
						/>
						<Route
							path={`${process.env.PUBLIC_URL}/sales/transactions`}
							element={<Transactionsales />}
						/>

						<Route
							path={`${process.env.PUBLIC_URL}/coupons/list-coupons`}
							element={<ListCoupons />}
						/>
						<Route
							path={`${process.env.PUBLIC_URL}/coupons/create-coupons`}
							element={<Createcoupons />}
						/>
	<Route
							path={`${process.env.PUBLIC_URL}/cms/about-us`}
							element={<AboutUs />}
						/>
						<Route
							path={`${process.env.PUBLIC_URL}/cms/faq`}
							element={<Faq />}
						/>
						<Route
							path={`${process.env.PUBLIC_URL}/cms/authors`}
							element={<Authors />}
						/>
						<Route
							path={`${process.env.PUBLIC_URL}/products/physical/master_type_category`}
							element={<MasterCategory />}
						/>
							<Route
							path={`${process.env.PUBLIC_URL}/cms/address`}
							element={<Address />}
						/>
							<Route
							path={`${process.env.PUBLIC_URL}/cms/terms-conditions`}
							element={<TermsCondition />}
						/>
						<Route
							path={`${process.env.PUBLIC_URL}/pages/list-page`}
							element={<ListPages />}
						/>
						<Route
							path={`${process.env.PUBLIC_URL}/pages/create-page`}
							element={<Createpage />}
						/>

						<Route path={`${process.env.PUBLIC_URL}/media`} element={<Media />} />

						<Route
							path={`${process.env.PUBLIC_URL}/menus/list-menu`}
							element={<Listmenu />}
						/>
							<Route
							path={`${process.env.PUBLIC_URL}/products/physical/shop-by-exam`}
							element={<ShopByExam />}
						/>
						
						<Route
							path={`${process.env.PUBLIC_URL}/menus/create-menu`}
							element={<Createmenu />}
						/>

						<Route
							path={`${process.env.PUBLIC_URL}/users/list-user`}
							element={<Listuser />}
						/>
						<Route
							path={`${process.env.PUBLIC_URL}/users/create-user`}
							element={<Createuser />}
						/>

						<Route
							path={`${process.env.PUBLIC_URL}/vendors/list_vendors`}
							element={<Listvendors />}
						/>
						<Route
							path={`${process.env.PUBLIC_URL}/vendors/create-vendors`}
							element={<Createvendors />}
						/>

						<Route
							path={`${process.env.PUBLIC_URL}/localization/transactions`}
							element={<Translations />}
						/>
						<Route
							path={`${process.env.PUBLIC_URL}/localization/currency-rates`}
							element={<Rates />}
						/>
						<Route
							path={`${process.env.PUBLIC_URL}/localization/taxes`}
							element={<Taxes />}
						/>

						<Route
							path={`${process.env.PUBLIC_URL}/reports/report`}
							element={<Reports />}
						/>

						<Route 
							path={`${process.env.PUBLIC_URL}/settings/profile`}
							element={<Profile />}
						/>
						<Route 
							path={`${process.env.PUBLIC_URL}/settings/logo`}
							element={<Logo />}
						/>

						{/* <Route
							path={`${process.env.PUBLIC_URL}/invoice`}
							element={<Invoice />}
						/> */}

						<Route
							path={`${process.env.PUBLIC_URL}/data-table`}
							element={<Datatable />}
						/>
						<Route
							path={`${process.env.PUBLIC_URL}/settings/size`}
							element={<Size />}
						/>
						<Route
							path={`${process.env.PUBLIC_URL}/settings/tax`}
							element={<Tax />}
						/>
						<Route
							path={`${process.env.PUBLIC_URL}/settings/banner`}
							element={<Banner />}
						/>
                </Route>
        </Routes>
    </Fragment>
    )
}

export default LayoutRoutes