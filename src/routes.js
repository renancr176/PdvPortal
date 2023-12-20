import { Routes, Route } from "react-router-dom";

import { USER_ROLES, requireAll } from "./utils/userRoles";
import RequiredAuth from "./utils/requiredAuth";

//#region Public Pages
import Home from "./pages/public/home";
import NotFound from "./pages/public/errors/notFound";
import SignIn from "./pages/public/auth/signIn";
import PasswordReset from "./pages/public/auth/passwordReset";
import ResetPassword from "./pages/public/auth/resetPassword";
import ConfirmEmail from "./pages/public/auth/confirmEmail";
import AccessDenied from "./pages/public/errors/accessDenied";
//import Checkout from "./pages/public/checkout";
/*import CartPage from "./pages/public/cart";
import OrderPage from "./pages/public/order";
import Catalogs from "./pages/public/catalogs";
import CatalogDetail from "./pages/public/catalogs/detail";*/
//#endregion

//#region Customer Pages
/*import AccountEdit from "./pages/customer/account/edit";
import CustomerOrders from "./pages/customer/orders";*/
//#endregion

//#region Admin Pages
/*import AdminOrders from './pages/admin/orders';
import AdminProducts from './pages/admin/products';
import AdminAddProduct from './pages/admin/products/add';
import AdminEditProduct from './pages/admin/products/edit';
import AdminCustomers from './pages/admin/customers';
import AdminAddCustomer from './pages/admin/customers/add';
import AdminEditCustomer from './pages/admin/customers/edit';
import AdminCatalogs from './pages/admin/catalogs';
import AdminAddCatalog from './pages/admin/catalogs/add';
import AdminEditCatalog from './pages/admin/catalogs/edit';*/
//#endregion

//#region Remover - Templates Exemplo
import RouteElement from "./components/routeElement";
import AdminUsers from "./pages/admin/users";
//#endregion

const PageRoutes = [
	{
		path: "/health/live",
		name: "health-check",
		pageSettings: {
			header: false,
			footer: false,
			breadcrumb: false,
			sidebar: false,
			title: "Health - Pdv",
		},
		element: <span>Pdv is Healthy!</span>,
	},
	{
		path: "",
		name: "home",
		pageSettings: {
			header: true,
			footer: true,
			breadcrumb: true,
			sidebar: false,
			title: "Pdv",
		},
		element: <Home />,
		children: [
			{
				path: "auth",
				name: "auth",
				pageSettings: {
					header: false,
					footer: false,
					breadcrumb: false,
					sidebar: false,
					title: "Meu Pdv",
				},
				children: [
					{
						path: "signin",
						name: "signin",
						element: <SignIn />,
					},
					{
						path: "passwordreset",
						name: "passwordreset",
						element: <PasswordReset />,
					},
					{
						path: "resetpassword/:token",
						name: "resetpassword",
						element: <ResetPassword />,
					},
					{
						path: "confirmemail/:token",
						name: "confirmemail",
						element: <ConfirmEmail />,
					},
				],
			},
			/*{
				path: "catalogs",
				name: "catalogs.index",
				element: <Catalogs />,
				pageSettings: {
					title: "Pdv - Planos de celular empresariais"
				},
				children: [
					{
						path: ":id",
						name: "catalogs.detail",
						element: <CatalogDetail />,
					},
				],
			},*/
			/*{
				path: "cart",
				name: "cart",
				element: <CartPage />,
			},
			{
				path: "checkout",
				name: "checkout",
				element: <Checkout />,
			},
			{
				path: "order/:id",
				name: "order.detail",
				element: <OrderPage />,
			},*/
			
			//#region Customer Pages
			/*{
				roles: [USER_ROLES.CUSTOMER],
				path: "account",
				name: "account.index",
				pageSettings: {
					sidebar: true,
				},
				element: <NotFound />,
				children: [
					{
						path: "edit",
						name: "account.edit",
						element: <AccountEdit />,
					},
					{
						path: "orders",
						name: "account.orders",
						element: <CustomerOrders />,
						children: [
							{
								path: ":id",
								name: "account.orderDetail",
								children: [
									{
										path: "invoice",
										name: "accountOrderInvoice",
										pageSettings: {
											sidebar: false,
											header: false,
											footer: false,
											breadcrumb: false,
											title: "nf - Pdv",
										},
										element: <InvoicePage />
									}
								]
							}
						]
					},
					{
						path: "consumption",
						name: "account.consumption",
						element: <ConsumptionHistory />,
					},

				],
			},*/
			//#endregion
			//#region Admin Pages
			/*{
				roles: [USER_ROLES.ADMIN, USER_ROLES.SELLER],
				path: "admin",
				name: "admin.index",
				pageSettings: {
					sidebar: true,
				},
				element: <NotFound />,
				children: [
					{
						path: "orders",
						name: "admin.orders",
						element: <AdminOrders />,
					},
					{
						path: "products",
						name: "admin.products",
						element: <AdminProducts />,
						children: [
							{
								roles: [USER_ROLES.ADMIN],
								path: "add",
								name: "admin.productAdd",
								element: <AdminAddProduct />
							},
							{
								roles: [USER_ROLES.ADMIN],
								path: ":id",
								name: "admin.productEdit",
								element: <AdminEditProduct />
							},
						]
					},
					{
						path: "catalogs",
						name: "admin.catalogs",
						element: <AdminCatalogs />,
						children: [
							{
								roles: [USER_ROLES.ADMIN],
								path: "add",
								name: "admin.catalogAdd",
								element: <AdminAddCatalog />
							},
							{
								roles: [USER_ROLES.ADMIN],
								path: ":id",
								name: "admin.catalogEdit",
								element: <AdminEditCatalog />
							},
						]
					},
					{
						roles: [USER_ROLES.ADMIN],
						path: "payments",
						name: "admin.payments",
						element: <AdminPaymentMethodsPage />,
						children: [
							{
								roles: [USER_ROLES.ADMIN],
								path: "add",
								name: "admin.paymentsAdd",
								element: <AdminAddPayment />
							},
							{
								roles: [USER_ROLES.ADMIN],
								path: ":id",
								name: "admin.paymentsEdit",
								element: <AdminEditPayment />
							},
						]
					},
					{
						path: "users",
						name: "admin.users",
						roles: [USER_ROLES.ADMIN],
						element: <AdminUsers />,
					},
					{
						path: "customers",
						name: "admin.customers",
						element: <AdminCustomers />,
						children: [
							{
								roles: [USER_ROLES.ADMIN],
								path: "add",
								name: "admin.customerAdd",
								element: <AdminAddCustomer />
							},
							{
								roles: [USER_ROLES.ADMIN],
								path: ":id",
								name: "admin.customerEdit",
								element: <AdminEditCustomer />
							},
						]
					},
					{
						path: "reports/invoices",
						name: "admin.reports.invoices",
						element: <ReportInvoice />
					},
				],
			},*/
			//#endregion
			// TODO: Remover Exemplo =====>
			/*{
				path: "MultipleRoles",
				roles: [requireAll([USER_ROLES.ADMIN, USER_ROLES.CUSTOMER])],
				element: <div>MultipleRoles</div>,
			},*/
			// <===== TODO: Remover Exemplo
			{
				path: "AccessDenied",
				element: <AccessDenied />,
			},
		],
	},
];

export default function EcommerceRoutes() {
	function mountRoute(
		{ path, element, name, roles, children, pageSettings },
		fatherRouteItems = [],
		fatherPageSettings = {}
	) {
		const settings = { ...fatherPageSettings, ...pageSettings };

		const routeItem = { path, name };
		const routeItems = name
			? [...fatherRouteItems, routeItem]
			: fatherRouteItems;

		const routePath = routeItems.map((x) => x.path).join("/");

		const hasRoles = roles && roles.length > 0;

		if (children) {
			return (
				<Route
					key={routePath}
					path={path}
					element={hasRoles && <RequiredAuth requiredRoles={roles} />}
				>
					{element && (
						<Route
							key={routePath + "/"}
							path=""
							element={
								<RouteElement
									element={element}
									routeItems={routeItems}
									pageSettings={settings}
								/>
							}
						/>
					)}
					{children.map((route) => mountRoute(route, routeItems, settings))}
					<Route key={routePath + "/*"} path="*" element={<NotFound />} />
				</Route>
			);
		}

		if (hasRoles) {
			return (
				<Route key={routePath} element={<RequiredAuth requiredRoles={roles} />}>
					<Route
						path={path}
						element={
							<RouteElement
								element={element}
								routeItems={routeItems}
								pageSettings={settings}
							/>
						}
					/>
				</Route>
			);
		}

		return (
			<Route
				key={routePath}
				path={path}
				element={
					<RouteElement
						element={element}
						routeItems={routeItems}
						pageSettings={settings}
					/>
				}
			/>
		);
	}

	return (
		<Routes>
			{PageRoutes.map((route) => mountRoute(route))}
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
