import { getAllUsers } from '@/pages/api/server/db/user/getAllUsers';
import { getServerSession } from 'next-auth';
import { Fragment, useState } from 'react';
import {
    Button,
    Card,
    Col,
    Form,
    Modal,
    Pagination,
    Row,
    Spinner,
    Switch,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Savetable } from '../../../shared/data/tables/datatablesdata';
import Pageheader from '../../../shared/layout-components/pageheader/pageheader';
import Seo from '../../../shared/layout-components/seo/seo';
import styles from './styles.module.scss';

const UsersComponent = ({ users }) => {
    const [contacts, setContacts] = useState(
        users?.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : 'N/A',
            isActive: user.isActive || false,
            imageUrl: user.imageUrl || '',
        }))
    );

    const [modalShow, setModalShow] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        role: 'SUBSCRIBER',
        isActive: true,
        imageUrl: '',
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = contacts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(contacts.length / itemsPerPage);

    const handlePageChange = (page) => setCurrentPage(page);

    const validateFields = () => {
        const { name, email } = formData;
        if (!name) return 'Nome';
        if (!email) return 'Email';
        return null;
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAdd = () => {
        setFormData({
            id: nanoid(),
            name: '',
            email: '',
            role: 'SUBSCRIBER',
            isActive: true,
            imageUrl: '',
        });
        setEditMode(false);
        setModalShow(true);
    };

    const handleEdit = (contact) => {
        setFormData(contact);
        setEditMode(true);
        setModalShow(true);
    };

    const handleSaveChanges = async (event) => {
        event.preventDefault();

        const missingField = validateFields();
        if (missingField) {
            toast.error(`Campo obrigatório: ${missingField}`);
            return;
        }

        setIsLoading(true);
        setModalShow(false);
        setEditMode(false);
        setIsLoading(false);
    };

    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            const response = await fetch(`/api/user/deleteUser?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Usuário excluído com sucesso!🚀');
                setContacts((prevContacts) =>
                    prevContacts.filter((c) => c.id !== id)
                );
            } else {
                toast.error('Falha ao excluir o usuário. Tente novamente!');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Erro ao excluir o usuário!');
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <Fragment>
            <Seo title={'Usuários'} />
            <Pageheader title="Usuários" heading="Usuários" active="Usuários" />

            <Row>
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <div className="card-title">
                                USUÁRIOS CADASTRADOS
                            </div>
                            <div className={styles.blockButton}>
                                <Button variant="primary" onClick={handleAdd}>
                                    Adicionar novo usuário
                                </Button>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Savetable
                                users={currentItems}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                deletingId={deletingId}
                            />
                            <Pagination className="mt-4 justify-content-center">
                                <Pagination.First
                                    onClick={() => handlePageChange(1)}
                                    disabled={currentPage === 1}
                                />
                                <Pagination.Prev
                                    onClick={() =>
                                        handlePageChange(currentPage - 1)
                                    }
                                    disabled={currentPage === 1}
                                />
                                {Array.from(
                                    { length: totalPages },
                                    (_, i) => i + 1
                                ).map((page) => (
                                    <Pagination.Item
                                        key={page}
                                        active={page === currentPage}
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next
                                    onClick={() =>
                                        handlePageChange(currentPage + 1)
                                    }
                                    disabled={currentPage === totalPages}
                                />
                                <Pagination.Last
                                    onClick={() => handlePageChange(totalPages)}
                                    disabled={currentPage === totalPages}
                                />
                            </Pagination>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editMode ? 'Editar Usuário' : 'Adicionar Novo Usuário'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSaveChanges}>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Nome"
                            onChange={handleFormChange}
                            value={formData.name}
                            className="mb-2"
                            required
                        />
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleFormChange}
                            value={formData.email}
                            className="mb-2"
                            required
                        />
                        <Form.Control
                            type="text"
                            name="role"
                            placeholder="Papel"
                            onChange={handleFormChange}
                            value={formData.role}
                            className="mb-2"
                            required
                        />

                        <Form.Group className="d-flex align-items-center mb-2">
                            <Form.Label className="me-2">Ativo:</Form.Label>
                            <Switch
                                checked={formData.isActive}
                                onChange={() =>
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        isActive: !prevData.isActive,
                                    }))
                                }
                            />
                            <Form.Text className="ms-2">
                                {formData.isActive ? 'Sim' : 'Não'}
                            </Form.Text>
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            className="mt-3"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />{' '}
                                    {editMode
                                        ? 'Salvando...'
                                        : 'Adicionando...'}
                                </>
                            ) : editMode ? (
                                'Salvar Alterações'
                            ) : (
                                'Adicionar'
                            )}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Fragment>
    );
};

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

    const users = await getAllUsers();

    return {
        props: {
            users,
        },
    };
};

UsersComponent.layout = 'Contentlayout';
export default UsersComponent;
