import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import * as Dashboarddata from '../../../shared/data/dashboards/dashboards1data';
import { BasicTable } from '../../../shared/data/dashboards/dashboards1data';
import Pageheader from '../../../shared/layout-components/pageheader/pageheader';
import Seo from '../../../shared/layout-components/seo/seo';
import { getSalesAmountLastWeek } from '../../api/server/db/finance/getSalesAmountLastWeek';
import { getSalesAmountToday } from '../../api/server/db/finance/getSalesAmountToday';
import { getProductsSoldLastWeek } from '../../api/server/db/products/getProductsSoldLastWeek';
import { getProductsSoldToday } from '../../api/server/db/products/getProductsSoldToday';

const Dashboard = ({
    totalSoldToday,
    salesAmountToday,
    productsSoldLastWeek,
    totalSalesAmountLastWeek,
}) => {
    const { data: session } = useSession();

    const capitalizeFirstLetter = (name) => {
        if (!name) return '';
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    };

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(amount);
    };

    const firstName = capitalizeFirstLetter(session?.user?.name?.split(' ')[0]);

    return (
        <>
            <Seo title={'Dashboard'} />
            <React.Fragment>
                <Pageheader
                    title="DASHBOARD"
                    heading="Dashboard"
                    active="Geral"
                />
                <Row>
                    <Col xxl={5} xl={12} lg={12} md={12} sm={12}>
                        <Row>
                            <Col xl={12} lg={12} md={12} xs={12}>
                                <Card>
                                    <Card.Body>
                                        <Row>
                                            <Col
                                                xl={9}
                                                lg={10}
                                                md={10}
                                                sm={12}
                                                className="mb-sm-0 mb-4 "
                                            >
                                                <div className="text-justified align-items-center">
                                                    <h3 className="text-dark fw-semibold mb-2 mt-0">
                                                        Olá, Bem Vindo de volta{' '}
                                                        <span className="text-primary">
                                                            {firstName}
                                                        </span>
                                                    </h3>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={6} lg={6} md={6} sm={6} xs={12}>
                                <Card className=" sales-card">
                                    <Row>
                                        <div className="col-8">
                                            <div className="ps-4 pt-4 pe-3 pb-4">
                                                <div className="">
                                                    <span className="mb-2 fs-12 fw-semibold d-block">
                                                        Pedidos hoje
                                                    </span>
                                                </div>
                                                <div className="pb-0 mt-0">
                                                    <div className="d-flex">
                                                        <h4 className="fs-20 fw-semibold mb-2">
                                                            {new Intl.NumberFormat(
                                                                'pt-BR'
                                                            ).format(
                                                                totalSoldToday
                                                            )}
                                                        </h4>
                                                    </div>
                                                    <p className="mb-0 fs-12 text-muted">
                                                        Ontem
                                                        <i className="bx bx-caret-up mx-2 text-success"></i>
                                                        <span className="text-success fw-semibold">
                                                            {' '}
                                                            +427
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div
                                                className="circle-icon bg-primary-transparent text-center align-self-center overflow-hidden"
                                                style={{
                                                    paddingTop: '2px',
                                                }}
                                            >
                                                <i className="bi bi-bag-check fs-16 text-primary"></i>
                                            </div>
                                        </div>
                                    </Row>
                                </Card>
                            </Col>

                            <Col xl={6} lg={6} md={6} sm={6} xs={12}>
                                <Card className=" sales-card">
                                    <Row className="row">
                                        <div className="col-8">
                                            <div className="ps-4 pt-4 pe-3 pb-4">
                                                <div className="">
                                                    <span className="mb-2 fs-12 fw-semibold d-block">
                                                        Faturado hoje
                                                    </span>
                                                </div>
                                                <div className="pb-0 mt-0">
                                                    <div className="d-flex">
                                                        <h4 className="fs-20 fw-semibold mb-2">
                                                            {formatAmount(
                                                                salesAmountToday
                                                            )}
                                                        </h4>
                                                    </div>
                                                    <p className="mb-0 fs-12 text-muted">
                                                        Ontem
                                                        <i className="bx bx-caret-down mx-2 text-danger"></i>
                                                        <span className="fw-semibold text-danger">
                                                            {' '}
                                                            -453
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="circle-icon bg-info-transparent text-center align-self-center overflow-hidden">
                                                <i className="fe fe-dollar-sign fs-16 text-info"></i>
                                            </div>
                                        </div>
                                    </Row>
                                </Card>
                            </Col>

                            <Col xl={6} lg={6} md={6} sm={6} xs={12}>
                                <Card className=" sales-card">
                                    <Row className="row">
                                        <div className="col-8">
                                            <div className="ps-4 pt-4 pe-3 pb-4">
                                                <div className="">
                                                    <span className="mb-2 fs-12 fw-semibold d-block">
                                                        Pedidos nos últimos 7
                                                        dias
                                                    </span>
                                                </div>
                                                <div className="pb-0 mt-0">
                                                    <div className="d-flex">
                                                        <h4 className="fs-20 fw-semibold mb-2">
                                                            {new Intl.NumberFormat(
                                                                'pt-BR'
                                                            ).format(
                                                                productsSoldLastWeek
                                                            )}
                                                        </h4>
                                                    </div>
                                                    <p className="mb-0 fs-12 text-muted">
                                                        Semana passada
                                                        <i className="bx bx-caret-up mx-2 text-success"></i>
                                                        <span className=" text-success fw-semibold">
                                                            +788
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="circle-icon bg-secondary-transparent text-center align-self-center overflow-hidden">
                                                <i className="fe fe-shopping-bag fs-16 text-secondary"></i>
                                            </div>
                                        </div>
                                    </Row>
                                </Card>
                            </Col>
                            <Col xl={6} lg={6} md={6} sm={6} xs={12}>
                                <Card className=" sales-card">
                                    <Row className="row">
                                        <div className="col-8">
                                            <div className="ps-4 pt-4 pe-3 pb-4">
                                                <div className="">
                                                    <span className="mb-2 fs-12 fw-semibold d-block">
                                                        Faturado semana passada
                                                    </span>
                                                </div>
                                                <div className="pb-0 mt-0">
                                                    <div className="d-flex">
                                                        <h4 className="fs-20 fw-semibold mb-2">
                                                            {formatAmount(
                                                                totalSalesAmountLastWeek
                                                            )}
                                                        </h4>
                                                    </div>
                                                    <p className="mb-0 fs-12  text-muted">
                                                        Semana passada
                                                        <i className="bx bx-caret-down mx-2 text-danger"></i>
                                                        <span className="text-danger fw-semibold">
                                                            -693
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="circle-icon bg-warning-transparent text-center align-self-center overflow-hidden">
                                                <i className="bi bi-coin fs-18 text-warning"></i>
                                            </div>
                                        </div>
                                    </Row>
                                </Card>
                            </Col>

                            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Card className="browser-usage">
                                    <Card.Header className="pb-1">
                                        <h3 className="card-title mb-2">
                                            Acessos
                                        </h3>
                                    </Card.Header>
                                    <Card.Body className="card-body p-0">
                                        <div className="browser-stats">
                                            <div className="d-flex align-items-center item  border-bottom my-2">
                                                <div className="d-flex">
                                                    <img
                                                        src="../../../assets/images/svgicons/chrome.svg"
                                                        alt="img"
                                                        className="ht-30 wd-30 me-2"
                                                    />
                                                    <div className="truncate">
                                                        <h6 className="">
                                                            Chrome
                                                        </h6>
                                                        <span className="text-muted fs-12">
                                                            Google, Inc.
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="ms-auto my-auto">
                                                    <div className="d-flex">
                                                        <span className="me-4 mt-1 fw-semibold fs-16">
                                                            35,502
                                                        </span>
                                                        <span className="text-success fs-13 my-auto">
                                                            <i className="fe fe-trending-up text-success mx-2 my-auto"></i>
                                                            12.75%
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center item  border-bottom my-2">
                                                <div className="d-flex">
                                                    <img
                                                        src="../../../assets/images/svgicons/edge.svg"
                                                        alt="img"
                                                        className="ht-30 wd-30 me-2"
                                                    />
                                                    <div className="truncate">
                                                        <h6 className="">
                                                            Edge
                                                        </h6>
                                                        <span className="text-muted fs-12">
                                                            Microsoft
                                                            Corporation, Inc.
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="ms-auto my-auto">
                                                    <div className="d-flex">
                                                        <span className="me-4 mt-1 fw-semibold fs-16">
                                                            25,364
                                                        </span>
                                                        <span className="text-success">
                                                            <i className="fe fe-trending-down text-danger mx-2 my-auto"></i>
                                                            24.37%
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center item  border-bottom my-2">
                                                <div className="d-flex">
                                                    <img
                                                        src="../../../assets/images/svgicons/firefox.svg"
                                                        alt="img"
                                                        className="ht-30 wd-30 me-2"
                                                    />
                                                    <div className="truncate">
                                                        <h6 className="">
                                                            Firefox
                                                        </h6>
                                                        <span className="text-muted fs-12">
                                                            Mozilla Foundation,
                                                            Inc.
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="ms-auto my-auto">
                                                    <div className="d-flex">
                                                        <span className="me-4 mt-1 fw-semibold fs-16">
                                                            14,635
                                                        </span>
                                                        <span className="text-success">
                                                            <i className="fe fe-trending-up text-success mx-2 my-auto"></i>
                                                            15,63%
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center item  border-bottom my-2">
                                                <div className="d-flex">
                                                    <img
                                                        src="../../../assets/images/svgicons/safari.svg"
                                                        alt="img"
                                                        className="ht-30 wd-30 me-2"
                                                    />
                                                    <div className="truncate">
                                                        <h6 className="">
                                                            Safari
                                                        </h6>
                                                        <span className="text-muted fs-12">
                                                            Apple Corporation,
                                                            Inc.
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="ms-auto my-auto">
                                                    <div className="d-flex">
                                                        <span className="me-4 mt-1 fw-semibold fs-16">
                                                            35,657
                                                        </span>
                                                        <span className="text-danger">
                                                            <i className="fe fe-trending-up text-success mx-2 my-auto"></i>
                                                            12.54%
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center item  border-bottom my-2">
                                                <div className="d-flex">
                                                    <img
                                                        src="../../../assets/images/svgicons/chrome.svg"
                                                        alt="img"
                                                        className="ht-30 wd-30 me-2"
                                                    />
                                                    <div className="truncate">
                                                        <h6 className="">
                                                            Chrome
                                                        </h6>
                                                        <span className="text-muted fs-12">
                                                            Google, Inc.
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="ms-auto my-auto">
                                                    <div className="d-flex">
                                                        <span className="me-4 mt-1 fw-semibold fs-16">
                                                            35,502
                                                        </span>
                                                        <span className="text-success fs-13 my-auto">
                                                            <i className="fe fe-trending-up text-success mx-2 my-auto"></i>
                                                            12.75%
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center item my-2 pb-3">
                                                <div className="d-flex">
                                                    <img
                                                        src="../../../assets/images/svgicons/opera.svg"
                                                        alt="img"
                                                        className="ht-30 wd-30 me-2"
                                                    />
                                                    <div className="truncate">
                                                        <h6 className="">
                                                            Opera
                                                        </h6>
                                                        <span className="text-muted fs-12">
                                                            Opera, Inc.
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="ms-auto my-auto">
                                                    <div className="d-flex">
                                                        <span className="me-4 mt-1 fw-semibold fs-16">
                                                            12,563
                                                        </span>
                                                        <span className="text-danger">
                                                            <i className="fe fe-trending-down text-danger mx-2 my-auto"></i>
                                                            15.12%
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col xxl={7} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Card className=" custom-card overflow-hidden">
                            <Card.Header className=" border-bottom-0">
                                <div>
                                    <h3 className="card-title mb-2 ">
                                        Relatório Mensal
                                    </h3>{' '}
                                    <span className="d-block fs-12 mb-0 text-muted"></span>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <div id="statistics1">
                                    <Dashboarddata.Statistics1 />
                                </div>
                            </Card.Body>
                        </Card>
                        <Row>
                            <Col xl={6} lg={12} sm={12}>
                                <Card className=" overflow-hidden website">
                                    <Card.Header className=" pb-1">
                                        <h3 className="card-title mb-2">
                                            Clientes recentes
                                        </h3>
                                    </Card.Header>
                                    <Card.Body className=" p-0 customers mt-1">
                                        <div className="list-group list-lg-group list-group-flush">
                                            <Link
                                                href="#!"
                                                className="border-0"
                                            >
                                                <div className="list-group-item list-group-item-action p-3 border-0">
                                                    <div className="media mt-0">
                                                        <img
                                                            className="avatar-lg rounded-circle me-3 my-auto shadow"
                                                            src="../../../assets/images/faces/2.jpg"
                                                            alt="Image description"
                                                        />
                                                        <div className="media-body flex-fill">
                                                            <div className="d-flex align-items-center">
                                                                <div className="mt-0">
                                                                    <h5 className="mb-1 fs-13 font-weight-sembold text-dark">
                                                                        Samantha
                                                                        Melon
                                                                    </h5>
                                                                    <p className="mb-0 fs-12 text-muted">
                                                                        User ID:
                                                                        #1234
                                                                    </p>
                                                                </div>
                                                                <span className="ms-auto wd-45p fs-14">
                                                                    <span className="float-end badge bg-success-transparent">
                                                                        <span className="op-7 text-success fw-semibold">
                                                                            paid{' '}
                                                                        </span>
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                            <Link
                                                href="#!"
                                                className="border-0"
                                            >
                                                <div className="list-group-item list-group-item-action p-3 border-0">
                                                    <div className="media mt-0">
                                                        <img
                                                            className="avatar-lg rounded-circle me-3 my-auto shadow"
                                                            src="../../../assets/images/faces/1.jpg"
                                                            alt="Image description"
                                                        />
                                                        <div className="media-body flex-fill">
                                                            <div className="d-flex align-items-center">
                                                                <div className="mt-1">
                                                                    <h5 className="mb-1 fs-13 font-weight-sembold text-dark">
                                                                        Allie
                                                                        Grater
                                                                    </h5>
                                                                    <p className="mb-0 fs-12 text-muted">
                                                                        User ID:
                                                                        #1234
                                                                    </p>
                                                                </div>
                                                                <span className="ms-auto wd-45p fs-14">
                                                                    <span className="float-end badge bg-danger-transparent ">
                                                                        <span className="op-7 text-danger fw-semibold">
                                                                            Pending
                                                                        </span>
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                            <Link
                                                href="#!"
                                                className="border-0"
                                            >
                                                <div className="list-group-item list-group-item-action p-3 border-0">
                                                    <div className="media mt-0">
                                                        <img
                                                            className="avatar-lg rounded-circle me-3 my-auto shadow"
                                                            src="../../../assets/images/faces/5.jpg"
                                                            alt="Image description"
                                                        />
                                                        <div className="media-body flex-fill">
                                                            <div className="d-flex align-items-center">
                                                                <div className="mt-1">
                                                                    <h5 className="mb-1 fs-13 font-weight-sembold text-dark">
                                                                        Gabe
                                                                        Lackmen
                                                                    </h5>
                                                                    <p className="mb-0 fs-12 text-muted">
                                                                        User ID:
                                                                        #1234
                                                                    </p>
                                                                </div>
                                                                <span className="ms-auto wd-45p  fs-14">
                                                                    <span className="float-end badge bg-danger-transparent ">
                                                                        <span className="op-7 text-danger fw-semibold">
                                                                            Pending
                                                                        </span>
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                            <Link
                                                href="#!"
                                                className="border-0"
                                            >
                                                <div className="list-group-item list-group-item-action p-3 border-0">
                                                    <div className="media mt-0">
                                                        <img
                                                            className="avatar-lg rounded-circle me-3 my-auto shadow"
                                                            src="../../../assets/images/faces/7.jpg"
                                                            alt="Image description"
                                                        />
                                                        <div className="media-body flex-fill">
                                                            <div className="d-flex align-items-center">
                                                                <div className="mt-1">
                                                                    <h5 className="mb-1 fs-13 font-weight-sembold text-dark">
                                                                        Manuel
                                                                        Labor
                                                                    </h5>
                                                                    <p className="mb-0 fs-12 text-muted">
                                                                        User ID:
                                                                        #1234
                                                                    </p>
                                                                </div>
                                                                <span className="ms-auto wd-45p fs-14">
                                                                    <span className="float-end badge bg-success-transparent ">
                                                                        <span className="op-7 text-success fw-semibold">
                                                                            Paid
                                                                        </span>
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                            <Link
                                                href="#!"
                                                className="border-0"
                                            >
                                                <div className="list-group-item list-group-item-action p-3 border-0">
                                                    <div className="media mt-0">
                                                        <img
                                                            className="avatar-lg rounded-circle me-3 my-auto shadow"
                                                            src="../../../assets/images/faces/9.jpg"
                                                            alt="Image description"
                                                        />
                                                        <div className="media-body flex-fill">
                                                            <div className="d-flex align-items-center">
                                                                <div className="mt-1">
                                                                    <h5 className="mb-1 fs-13 font-weight-sembold text-dark">
                                                                        Hercules
                                                                        Bing
                                                                    </h5>
                                                                    <p className="mb-0 fs-12 text-muted">
                                                                        User ID:
                                                                        #1754
                                                                    </p>
                                                                </div>
                                                                <span className="ms-auto wd-45p fs-14">
                                                                    <span className="float-end badge bg-success-transparent ">
                                                                        <span className="op-7 text-success fw-semibold">
                                                                            Paid
                                                                        </span>
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                            <Link
                                                href="#!"
                                                className="border-0"
                                            >
                                                <div className="list-group-item list-group-item-action p-3 border-0">
                                                    <div className="media mt-0">
                                                        <img
                                                            className="avatar-lg rounded-circle me-3 my-auto shadow"
                                                            src="../../../assets/images/faces/11.jpg"
                                                            alt="Image description"
                                                        />
                                                        <div className="media-body flex-fill">
                                                            <div className="d-flex align-items-center">
                                                                <div className="mt-1">
                                                                    <h5 className="mb-1 fs-13 font-weight-sembold text-dark">
                                                                        Manuel
                                                                        Labor
                                                                    </h5>
                                                                    <p className="mb-0 fs-12 text-muted">
                                                                        User ID:
                                                                        #1234
                                                                    </p>
                                                                </div>
                                                                <span className="ms-auto wd-45p fs-14">
                                                                    <span className="float-end badge bg-danger-transparent ">
                                                                        <span className="op-7 text-danger fw-semibold">
                                                                            Pending
                                                                        </span>
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col xl={6} lg={12} sm={12}>
                                <Card>
                                    <Card.Header className=" pb-0">
                                        <h3 className="card-title mb-2">
                                            Weekly Visitors
                                        </h3>
                                    </Card.Header>
                                    <Card.Body className=" pb-0">
                                        <div className="row mb-4">
                                            <div className="col-6">
                                                <div className="text-muted fs-12 text-center mb-2">
                                                    Visitas com celular
                                                </div>
                                                <div className="d-flex justify-content-center align-items-center flex-wrap">
                                                    <span className="me-3 fs-26 fw-semibold">
                                                        2,132
                                                    </span>
                                                    <span className="text-success fw-semibold">
                                                        <i className="fa fa-caret-up me-2"></i>
                                                        0.23%
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="text-muted fs-12 text-center mb-2">
                                                    Visitas com computador
                                                </div>
                                                <div className="d-flex justify-content-center align-items-center flex-wrap">
                                                    <span className="me-3 fs-26 fw-semibold">
                                                        1,053
                                                    </span>
                                                    <span className="text-danger fw-semibold">
                                                        <i className="fa fa-caret-down me-2"></i>
                                                        0.11%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="Viewers">
                                            <Dashboarddata.Viewers />
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>

                            {/* <Col xl={6} lg={12}>
                                <Card>
                                    <Card.Header className=" pb-3">
                                        <h3 className="card-title mb-2">
                                            MAIN TASKS
                                        </h3>
                                    </Card.Header>
                                    <Card.Body className=" p-0 customers mt-1">
                                        <div className="">
                                            <label className="p-2 d-flex">
                                                <span className="form-check mb-0 ms-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id="flexCheckChecked1"
                                                    />
                                                </span>
                                                <span className="mx-3 my-auto">
                                                    accurate information at any
                                                    given point.
                                                </span>
                                                <span className="ms-auto">
                                                    <span className="badge bg-primary-transparent fw-semibold px-2 py-1 fs-11 me-2">
                                                        Today
                                                    </span>
                                                </span>
                                            </label>
                                            <label className="p-2 mt-1 d-flex">
                                                <span className="form-check mb-0 ms-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id="flexCheckChecked01"
                                                    />
                                                </span>
                                                <span className="mx-3 my-auto">
                                                    sharing the information with
                                                    clients or stakeholders.
                                                </span>
                                                <span className="ms-auto">
                                                    <span className="badge bg-primary-transparent fw-semibold px-2 py-1 fs-11 me-2">
                                                        Today
                                                    </span>
                                                </span>
                                            </label>
                                            <label className="p-2 mt-1 d-flex">
                                                <span className="form-check mb-0 ms-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id="flexCheckChecked2"
                                                    />
                                                </span>
                                                <span className="mx-3 my-auto">
                                                    Hearing the information and
                                                    responding .
                                                </span>
                                                <span className="ms-auto">
                                                    <span className="badge bg-primary-transparent fw-semibold px-2 py-1 fs-11 me-2 float-end">
                                                        22 hrs
                                                    </span>
                                                </span>
                                            </label>
                                            <label className="p-2 mt-1 d-flex">
                                                <span className="form-check mb-0 ms-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id="flexCheckChecked3"
                                                    />
                                                </span>
                                                <span className="mx-3 my-auto">
                                                    Setting up and customizing
                                                    your own sales.
                                                </span>
                                                <span className="ms-auto">
                                                    {' '}
                                                    <span className="badge bg-light-transparent fw-semibold px-2 py-1 fs-11 me-2">
                                                        1 Day
                                                    </span>
                                                </span>
                                            </label>
                                            <label className="p-2 mt-1 d-flex">
                                                <span className="form-check mb-0 ms-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id="flexCheckChecked05"
                                                        defaultChecked
                                                    />
                                                </span>
                                                <span className="mx-3 my-auto">
                                                    To have a complete 360°
                                                    overview of sales
                                                    information, having.
                                                </span>
                                                <span className="ms-auto">
                                                    {' '}
                                                    <span className="badge bg-light-transparent fw-semibold px-2 py-1 fs-11 me-2">
                                                        2 Days
                                                    </span>
                                                </span>
                                            </label>
                                            <label className="p-2 mt-1 d-flex">
                                                <span className="form-check mb-0 ms-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id="flexCheckChecked07"
                                                    />
                                                </span>
                                                <span className="mx-3 my-auto">
                                                    sharing the information with
                                                    clients or stakeholders.
                                                </span>
                                                <span className="ms-auto">
                                                    <span className="badge bg-primary-transparent fw-semibold px-2 py-1 fs-11 me-2">
                                                        Today
                                                    </span>
                                                </span>
                                            </label>
                                            <label className="p-2 mt-1 d-flex">
                                                <span className="form-check mb-0 ms-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id="flexCheckChecked06"
                                                        defaultChecked
                                                    />
                                                </span>
                                                <span className="mx-3 my-auto">
                                                    New Admin Launched.
                                                </span>
                                            </label>
                                            <label className="p-2 mt-1 d-flex">
                                                <span className="form-check mb-0 ms-2">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id="flexCheckChecked08"
                                                        defaultChecked
                                                    />
                                                </span>
                                                <span className="mx-3 my-auto">
                                                    To maximize profits and
                                                    improve productivity.
                                                </span>
                                            </label>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col> */}
                        </Row>
                    </Col>
                </Row>
                {/* <!-- row closed --> */}
                {/* <!-- row --> */}

                <Row>
                    <Col sm={12} className="col-12">
                        <Card>
                            <Card.Header>
                                <h4 className="card-title">Product Summary</h4>
                            </Card.Header>
                            <Card.Body className="pt-0 example1-table">
                                <div className="table-responsive">
                                    <BasicTable />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {/* <!-- row closed --> */}
            </React.Fragment>
        </>
    );
};

Dashboard.layout = 'Contentlayout';

export default Dashboard;

export const getServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res);

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    const safeSession = {
        ...session,
        user: {
            ...session.user,
            image: session.user?.image ?? null,
        },
    };

    const totalSoldToday = await getProductsSoldToday();

    const salesAmountToday = await getSalesAmountToday();

    const productsSoldLastWeek = await getProductsSoldLastWeek();

    const totalSalesAmountLastWeek = await getSalesAmountLastWeek();

    console.log(salesAmountToday, 'salesAmountToday');

    return {
        props: {
            session: safeSession,
            totalSoldToday,
            salesAmountToday,
            productsSoldLastWeek,
            totalSalesAmountLastWeek,
        },
    };
};
