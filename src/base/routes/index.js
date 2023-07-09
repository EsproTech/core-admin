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
import FileRoute from "../../filemanager/routes/FileRoute";
import CustomerRoute from "../../sale/routes/CustomerRoute";


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

// Rutas del Filemanager
router.use('/files', FileRoute);
// Rutas del modulo de Ventas
router.use('/customer', CustomerRoute);

module.exports = router;