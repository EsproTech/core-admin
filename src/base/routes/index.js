import { Router } from "express";
import UserRoute from "./UserRoute";
import AuthRoute from "./AuthRoute";
import AddressRoute from "./AddressRoute";
import CompanyRoute from "./companyRoute";
import StateRoute from "./StateRoute";
import CountryRoute from "./CountryRoute";
import NotificationRoute from "./NotificationRoute";
import CompanyUser from './CompanyUserRoute';
import GroupRoute from "./GroupRoute";
import CurrencyRoute from "./CurrencyRoute";
import ApplicationRoute from './ApplicationRoute';
// Rutas del modulo Filemanager
import FileRoute from "../../filemanager/routes/FileRoute";
// Rutas del modulo de ventas
import CustomerRoute from "../../sale/routes/CustomerRoute";
// Rutas del modulo de stock
import CategoryRoute from "../../stock/routes/CategoryRoute";


const router = Router();

router.use('/auth', AuthRoute);
router.use('/user', UserRoute);
router.use('/company', CompanyRoute);
router.use('/address', AddressRoute);
router.use('/state', StateRoute);
router.use('/country', CountryRoute);
router.use('/notification', NotificationRoute);
router.use('/usercompany', CompanyUser);
router.use('/application', ApplicationRoute);
router.use('/group', GroupRoute);
router.use('/currency', CurrencyRoute);
router.use('/category', CategoryRoute);
router.use('/files', FileRoute);
router.use('/customer', CustomerRoute);

module.exports = router;