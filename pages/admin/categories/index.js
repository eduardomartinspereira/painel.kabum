import { getAllCategories } from '@/pages/api/server/db/categories/getAllCategories';
import { CategoriesTable } from '@/shared/data/tables/datatablesdatacategories';
import { getServerSession } from 'next-auth';
import { Fragment, useState } from 'react';
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';
import Pageheader from '../../../shared/layout-components/pageheader/pageheader';
import Seo from '../../../shared/layout-components/seo/seo';
import styles from './styles.module.scss';

const CategoryTable = ({ categories }) => {
    const [modalShow, setModalShow] = useState(false);
    const [categoriesData, setCategoriesData] = useState(categories);
    const [addFormData, setAddFormData] = useState({
        name: '',
        description: '',
        parentCategoryId: '',
        isActive: false,
    });
    const [editFormData, setEditFormData] = useState({
        name: '',
        description: '',
        parentCategoryId: '',
        isActive: false,
    });
    const [editCategoryId, setEditCategoryId] = useState(null);

    const handleAddFormChange = (event) => {
        const { name, value } = event.target;
        setAddFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditFormChange = (event) => {
        const { name, value } = event.target;
        setEditFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddFormSubmit = (event) => {
        event.preventDefault();
        const newCategory = {
            id: nanoid(),
            ...addFormData,
            parentCategoryId: addFormData.parentCategoryId || null,
        };
        setCategoriesData((prev) => [...prev, newCategory]);
        setModalShow(false); // Close the modal after adding
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        const updatedCategory = {
            id: editCategoryId,
            ...editFormData,
            parentCategoryId: editFormData.parentCategoryId || null,
        };
        setCategoriesData((prev) =>
            prev.map((category) =>
                category.id === editCategoryId ? updatedCategory : category
            )
        );
        setEditCategoryId(null);
        setModalShow(false); // Close the modal after editing
    };

    const handleEditClick = (category) => {
        setEditCategoryId(category.id);
        setEditFormData({
            name: category.name,
            description: category.description,
            parentCategoryId: category.parentCategoryId || '',
            isActive: category.isActive,
        });
        setModalShow(true);
    };

    const handleDeleteClick = (categoryId) => {
        setCategoriesData((prev) =>
            prev.filter((category) => category.id !== categoryId)
        );
    };

    const handleCancelClick = () => {
        setEditCategoryId(null);
        setModalShow(false); // Close the modal
    };

    return (
        <Fragment>
            <Seo title="Categorias" />
            <Pageheader
                title="Categorias"
                heading="Categorias"
                active="Categorias"
            />
            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className={styles.container}>
                                <div className="card-title">
                                    CATEGORIAS CADASTRADAS
                                </div>
                                <Button
                                    variant="primary"
                                    onClick={() => setModalShow(true)}
                                >
                                    Adicionar Categoria
                                </Button>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <CategoriesTable
                                categoriesProps={categoriesData}
                                handleEditClick={handleEditClick}
                                handleDeleteClick={handleDeleteClick}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Modal for Add/Edit */}
            <Modal
                show={modalShow}
                onHide={handleCancelClick}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {editCategoryId
                            ? 'Editar Categoria'
                            : 'Adicionar Nova Categoria'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        onSubmit={
                            editCategoryId
                                ? handleEditFormSubmit
                                : handleAddFormSubmit
                        }
                    >
                        <Form.Control
                            type="text"
                            name="name"
                            required
                            placeholder="Nome da categoria..."
                            onChange={
                                editCategoryId
                                    ? handleEditFormChange
                                    : handleAddFormChange
                            }
                            value={
                                editCategoryId
                                    ? editFormData.name
                                    : addFormData.name
                            }
                            className="form-control mb-2"
                        />
                        <Form.Control
                            as="textarea"
                            name="description"
                            required
                            placeholder="Descrição da categoria..."
                            onChange={
                                editCategoryId
                                    ? handleEditFormChange
                                    : handleAddFormChange
                            }
                            value={
                                editCategoryId
                                    ? editFormData.description
                                    : addFormData.description
                            }
                            className="form-control mb-2"
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelClick}>
                        Fechar
                    </Button>
                    <Button variant="primary" type="submit">
                        {editCategoryId ? 'Salvar' : 'Adicionar'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};

CategoryTable.layout = 'Contentlayout';
export default CategoryTable;

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
    const categories = await getAllCategories();
    return {
        props: {
            categories,
        },
    };
};
