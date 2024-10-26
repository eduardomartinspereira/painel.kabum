import { getAllCategories } from '@/pages/api/server/db/products/getAllCategories';
import { getAllProducts } from '@/pages/api/server/db/products/getAllProducts';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
    Button,
    Card,
    Col,
    Form,
    InputGroup,
    Modal,
    OverlayTrigger,
    Pagination,
    Row,
    Tooltip,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Pageheader from '../../../shared/layout-components/pageheader/pageheader';
import Seo from '../../../shared/layout-components/seo/seo';
import {
    addToCart,
    addToWishlist,
    setSelectedItem,
} from '../../../shared/redux/action';
import styles from './styles.module.scss';

const DESCRIPTION_LIMIT = 150;
const ITEMS_PER_PAGE = 8;

const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

const formatCurrencyInput = (value) => {
    value = value.replace(/\D/g, '');
    const options = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    const result = new Intl.NumberFormat('pt-BR', options).format(
        parseFloat(value) / 100
    );
    return `R$ ${result}`;
};

const ProductCard = ({
    item,
    handleItemClick,
    handleAddToWishlist,
    handleAddToCart,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const truncateDescription = (text) => {
        if (isExpanded || text.length <= DESCRIPTION_LIMIT) {
            return text;
        }
        return text.slice(0, DESCRIPTION_LIMIT) + '...';
    };

    return (
        <Col sm={6} xl={4} xxl={3} lg={6} md={6}>
            <Card>
                <Card.Body className="h-100 product-grid6">
                    <div className="pro-img-box product-image">
                        <div>
                            <Link
                                href={
                                    '/admin/pages/e-commerce/product-details/'
                                }
                                onClick={() => handleItemClick(item)}
                            >
                                <img
                                    className={styles.img}
                                    src={item.img}
                                    alt={item.title}
                                />
                            </Link>
                        </div>
                        <ul className="icons">
                            <li>
                                <Link
                                    href={'/admin/pages/e-commerce/wish-list/'}
                                    onClick={() => handleAddToWishlist(item)}
                                >
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            <Tooltip>
                                                Adicionar à lista de desejos
                                            </Tooltip>
                                        }
                                    >
                                        <div className="primary-gradient me-2">
                                            <i className="fa fa-heart"></i>
                                        </div>
                                    </OverlayTrigger>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={'/admin/pages/e-commerce/cart/'}
                                    onClick={() => handleAddToCart(item)}
                                >
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            <Tooltip>
                                                Adicionar ao carrinho
                                            </Tooltip>
                                        }
                                    >
                                        <div className="secondary-gradient me-2">
                                            <i className="fa fa-shopping-cart"></i>
                                        </div>
                                    </OverlayTrigger>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={
                                        '/admin/pages/e-commerce/product-details/'
                                    }
                                    onClick={() => handleItemClick(item)}
                                >
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip>Visualizar</Tooltip>}
                                    >
                                        <div className="info-gradient">
                                            <i className="fas fa-eye"></i>
                                        </div>
                                    </OverlayTrigger>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="text-center pt-2">
                        <h3 className="h6 mb-2 mt-4 fw-bold text-uppercase">
                            {item.title}
                        </h3>
                        <span className="fs-15 ms-auto">
                            <i className="ion ion-md-star text-warning"></i>
                            <i className="ion ion-md-star text-warning"></i>
                            <i className="ion ion-md-star text-warning"></i>
                            <i className="ion ion-md-star text-warning"></i>
                            <i className="ion ion-md-star text-warning"></i>
                        </span>
                        <h4 className="h5 mb-0 mt-1 text-center fw-bold fs-22">
                            {formatCurrency(item.price)}
                            <del className="text-secondary font-weight-normal fs-13 d-inline-block ms-1 prev-price"></del>
                        </h4>
                        <p style={{ marginTop: '10px' }}>
                            {truncateDescription(item.description)}
                            {item.description.length > DESCRIPTION_LIMIT && (
                                <span
                                    className="text-primary cursor-pointer"
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {isExpanded ? ' Ver menos' : ' Ver mais...'}
                                </span>
                            )}
                        </p>
                        <p>Categoria: {item.category.name}</p>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

const Shop = ({ initialProducts, categories }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const productsInStore = useSelector((state) => state.products);

    const [products, setProducts] = useState(initialProducts);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState(products);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [newProduct, setNewProduct] = useState({
        title: '',
        description: '',
        price: '',
        img: '',
        category: '',
    });

    const handleItemClick = (item) => {
        dispatch(setSelectedItem(item));
    };
    const handleAddToWishlist = (item) => {
        dispatch(addToWishlist(item));
    };

    const allIds = [
        ...cart.map((item) => item.id),
        ...productsInStore.map((item) => item.id),
    ];
    const nextId = allIds.length ? Math.max(...allIds) + 1 : 1;

    const handleAddToCart = (item) => {
        dispatch(addToCart({ ...item, id: nextId }));
    };

    useEffect(() => {
        const filteredProducts = products.filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredProducts);
        setCurrentPage(1);
    }, [searchTerm, products]);

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(searchResults.length / ITEMS_PER_PAGE);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleCreateProduct = () => {
        console.log('Creating product:', newProduct);
        handleCloseModal();
    };

    const handlePriceChange = (e) => {
        const formattedPrice = formatCurrencyInput(e.target.value);
        setNewProduct({
            ...newProduct,
            price: formattedPrice,
        });
    };

    return (
        <div>
            <Seo title={'Produtos'} />
            <Pageheader title="Produtos" heading="Produtos" active="Products" />

            <Row className="row-sm">
                <Col xl={12} lg={12} md={12} style={{ width: '100%' }}>
                    <Card.Body className="p-2">
                        <InputGroup className={styles.inputGroup}>
                            <div className={styles.formGroup}>
                                <Form.Control
                                    type="text"
                                    placeholder="Pesquisar ..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                                <InputGroup.Text className="btn btn-primary">
                                    Pesquisar
                                </InputGroup.Text>
                            </div>
                            <div>
                                <Button
                                    variant=""
                                    type="button"
                                    className="btn btn-primary ms-2"
                                    onClick={handleShowModal}
                                >
                                    <i className="fe fe-plus me-1"></i> Criar
                                    Produto
                                </Button>
                            </div>
                        </InputGroup>
                    </Card.Body>

                    <Row className="row-sm">
                        {currentItems.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    Sem produtos
                                </td>
                            </tr>
                        ) : (
                            currentItems.map((item, index) => (
                                <ProductCard
                                    key={index}
                                    item={item}
                                    handleItemClick={handleItemClick}
                                    handleAddToWishlist={handleAddToWishlist}
                                    handleAddToCart={handleAddToCart}
                                />
                            ))
                        )}

                        <Pagination className="pagination product-pagination justify-content-end list-unstyled">
                            <Pagination.Item
                                onClick={() =>
                                    handlePageChange(currentPage - 1)
                                }
                                disabled={currentPage === 1}
                            >
                                Anterior
                            </Pagination.Item>
                            {[...Array(totalPages)].map((_, pageIndex) => (
                                <Pagination.Item
                                    key={pageIndex + 1}
                                    active={currentPage === pageIndex + 1}
                                    onClick={() =>
                                        handlePageChange(pageIndex + 1)
                                    }
                                >
                                    {pageIndex + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Item
                                onClick={() =>
                                    handlePageChange(currentPage + 1)
                                }
                                disabled={currentPage === totalPages}
                            >
                                Próximo
                            </Pagination.Item>
                        </Pagination>
                    </Row>
                </Col>
            </Row>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Criar Novo Produto</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <Form>
                        <Form.Group controlId="productTitle">
                            <Form.Label>Nome do produto</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Insira o título do produto"
                                value={newProduct.title}
                                onChange={(e) =>
                                    setNewProduct({
                                        ...newProduct,
                                        title: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>

                        <Form.Group
                            controlId="productDescription"
                            style={{ marginTop: '10px' }}
                        >
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Insira a descrição do produto"
                                value={newProduct.description}
                                onChange={(e) =>
                                    setNewProduct({
                                        ...newProduct,
                                        description: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>

                        <Form.Group
                            controlId="productPrice"
                            style={{ marginTop: '10px' }}
                        >
                            <Form.Label>Preço</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="R$0,00"
                                value={newProduct.price}
                                onChange={handlePriceChange}
                            />
                        </Form.Group>

                        <Form.Group
                            controlId="productQuantity"
                            style={{ marginTop: '10px' }}
                        >
                            <Form.Label>Estoque</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Quantidade em estoque"
                                value={newProduct.quantity}
                                onChange={(e) =>
                                    setNewProduct({
                                        ...newProduct,
                                        quantity: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>

                        <Form.Group
                            controlId="productImage"
                            style={{ marginTop: '10px' }}
                        >
                            <Form.Label>Imagem</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setNewProduct({
                                        ...newProduct,
                                        img: e.target.files[0],
                                    })
                                }
                            />
                        </Form.Group>

                        <Form.Group
                            controlId="productCategory"
                            style={{ marginTop: '10px' }}
                        >
                            <Form.Label>Categoria</Form.Label>
                            <Form.Select
                                value={newProduct.category}
                                onChange={(e) =>
                                    setNewProduct({
                                        ...newProduct,
                                        category: e.target.value,
                                    })
                                }
                            >
                                <option value="">
                                    Selecione uma categoria
                                </option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleCreateProduct}>
                        Criar Produto
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export const getServerSideProps = async () => {
    const products = await getAllProducts();
    const categories = await getAllCategories();

    return {
        props: {
            initialProducts: products,
            categories,
        },
    };
};

Shop.layout = 'Contentlayout';
export default Shop;
