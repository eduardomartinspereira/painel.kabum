import { CategoriesTable } from '@/shared/data/tables/datatablesdatacategories';
import { Fragment } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Pageheader from '../../../shared/layout-components/pageheader/pageheader';
import Seo from '../../../shared/layout-components/seo/seo';
const Datatables = () => {
    return (
        <Fragment>
            <Seo title={'Categorias'} />
            <Pageheader
                title="Categorias"
                heading="Dashboard"
                active="Categorias"
            />

            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">
                                CATEGORIAS CADASTRADAS
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <CategoriesTable />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};
Datatables.layout = 'Contentlayout';
export default Datatables;
