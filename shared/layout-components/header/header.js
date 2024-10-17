
import Link from "next/link";
import { Fragment, useEffect, useState, useRef } from "react";
import { Button, Card, Dropdown, Form, ListGroup, Nav, NavLink, Offcanvas, Tab } from "react-bootstrap";
import { ThemeChanger,removeFromCart } from "../../../shared/redux/action";
import SimpleBar from "simplebar-react";
import { connect, useDispatch, useSelector } from "react-redux";
import { MENUITEMS } from "../sidebar/nav";

import store from "../../redux/store";
import { basePath } from "../../../next.config";
import { cartProduct, initialNotifications, pane1, pane2, pane3 } from "../../data/header/header";
function Header({ local_varaiable, ThemeChanger }) {
	const ToggleDark = () => {

		ThemeChanger({
			...local_varaiable,
			"dataThemeMode": local_varaiable.dataThemeMode == "dark" ? "light" : "dark",
			"dataHeaderStyles": local_varaiable.dataThemeMode == "dark" ? "light" : "dark",
			"dataMenuStyles": local_varaiable.dataThemeMode == "dark" ? "light" : "dark",
			// "dataMenuStyles": local_varaiable.dataNavLayout == "horizontal" ? local_varaiable.dataThemeMode == "dark" ? "light" : "dark" : "dark"
			"bodyBg": "",
			"bodyBg1": "",
			"darkBg": "",
			"Light": "",
			"inputBorder": "",
		});
		const theme = store.getState();
		if (theme.dataThemeMode != "dark") {

			ThemeChanger({
				...theme,
				"bodyBg1": "",
				"bodyBg": "",
				"darkBg": "",
				"Light": "",
				"inputBorder": "",
			});
			localStorage.removeItem("nowadarktheme");
			localStorage.removeItem("darkBgRGB1");
			localStorage.removeItem("darkBgRGB2");
			localStorage.removeItem("darkBgRGB3");
			localStorage.removeItem("darkBgRGB4");
			localStorage.removeItem("nowaMenu");
			localStorage.removeItem("nowaHeader");
		}
		else {
			localStorage.setItem("nowadarktheme", "dark");
			localStorage.removeItem("nowaHeader");
			localStorage.removeItem("nowalighttheme");
			localStorage.removeItem("nowaMenu");
		}

	};
	// FullScreen
	const [fullScreen, setFullScreen] = useState(false);

	const toggleFullScreen = () => {
		const elem = document.documentElement;

		if (!document.fullscreenElement) {
			elem.requestFullscreen().then(() => setFullScreen(true));
		} else {
			document.exitFullscreen().then(() => setFullScreen(false));
		}
	};

	const handleFullscreenChange = () => {
		setFullScreen(!!document.fullscreenElement);
	};

	useEffect(() => {
		document.addEventListener("fullscreenchange", handleFullscreenChange);

		return () => {
			document.removeEventListener("fullscreenchange", handleFullscreenChange);
		};
	}, []);
	const searchRef = useRef(null);

	const handleClick = (event) => {
		const searchInput = searchRef.current;

		if (searchInput && (searchInput === event.target || searchInput.contains(event.target))) {
			document.querySelector(".header-search").classList.add("searchdrop");
		} else {
			document.querySelector(".header-search").classList.remove("searchdrop");
		}
	};
	const [menuitems, setMenuitems] = useState(MENUITEMS);

	//// search Functionality
	const [showa, setShowa] = useState(false);
	const [InputValue, setInputValue] = useState("");
	const [show2, setShow2] = useState(false);
	const [searchcolor, setsearchcolor] = useState("text-dark");
	const [searchval, setsearchval] = useState("Type something");
	const [NavData, setNavData] = useState([]);

	const myfunction = (inputvalue) => {
		document.querySelector(".search-result")?.classList.remove("d-none");

		const i = [];
		const allElement2 = [];

		MENUITEMS.forEach((mainLevel) => {
			if (mainLevel.children) {
				setShowa(true);
				mainLevel.children.forEach((subLevel) => {
					i.push(subLevel);
					if (subLevel.children) {
						subLevel.children.forEach((subLevel1) => {
							i.push(subLevel1);
							if (subLevel1.children) {
								subLevel1.children.forEach((subLevel2) => {
									i.push(subLevel2);
								});
							}
						});
					}
				});
			}
		});

		for (const allElement of i) {
			if (allElement.title.toLowerCase().includes(inputvalue.toLowerCase())) {
				if (allElement.title.toLowerCase().startsWith(inputvalue.toLowerCase())) {
					setShow2(true);

					// Check if the element has a path and doesn't already exist in allElement2 before pushing
					if (allElement.path && !allElement2.some((el) => el.title === allElement.title)) {
						allElement2.push(allElement);
					}
				}
			}
		}

		if (!allElement2.length || inputvalue === "") {
			if (inputvalue === "") {
				setShow2(false);
				setsearchval("Type something");
				setsearchcolor("text-dark");
			}
			if (!allElement2.length) {
				setShow2(false);
				setsearchcolor("text-danger");
				setsearchval("There is no component with this name");
			}
		}
		setNavData(allElement2);

	};
	function menuClose() {
		const theme = store.getState();
		ThemeChanger({ ...theme, "toggled": "close" });
	}
	const swichermainright = () => {
		document.querySelector(".offcanvas-end")?.classList.toggle("show");
		if (document.querySelector(".switcher-backdrop")?.classList.contains("d-none")) {
			document.querySelector(".switcher-backdrop")?.classList.add("d-block");
			document.querySelector(".switcher-backdrop")?.classList.remove("d-none");
		}
	};
	const toggleSidebar = () => {
		const theme = store.getState();
		const sidemenuType = theme.dataNavLayout;
		if (window.innerWidth >= 992) {
			if (sidemenuType === "vertical") {
				const verticalStyle = theme.dataVerticalStyle;
				const navStyle = theme.dataNavStyle;
				switch (verticalStyle) {
				// closed
				case "closed":
					ThemeChanger({ ...theme, "dataNavStyle": "" });
					if (theme.toggled === "close-menu-close") {
						ThemeChanger({ ...theme, "toggled": "" });
					} else {
						ThemeChanger({ ...theme, "toggled": "close-menu-close" });
					}
					break;
					// icon-overlay
				case "overlay":
					ThemeChanger({ ...theme, "dataNavStyle": "" });
					if (theme.toggled === "icon-overlay-close") {
						ThemeChanger({ ...theme, "toggled": "" });
					} else {
						if (window.innerWidth >= 992) {
							ThemeChanger({ ...theme, "toggled": "icon-overlay-close" });
						}
					}
					break;
					// icon-text
				case "icontext":
					ThemeChanger({ ...theme, "dataNavStyle": "" });
					if (theme.toggled === "icon-text-close") {
						ThemeChanger({ ...theme, "toggled": "" });
					} else {
						ThemeChanger({ ...theme, "toggled": "icon-text-close" });
					}
					break;
					// doublemenu
				case "doublemenu":
					ThemeChanger({ ...theme, "dataNavStyle": "" });
					if (theme.toggled === "double-menu-open") {
						ThemeChanger({ ...theme, "toggled": "double-menu-close" });
					} else {
						const sidemenu = document.querySelector(".side-menu__item.active");
						if (sidemenu) {
							if (sidemenu.nextElementSibling) {
								sidemenu.nextElementSibling.classList.add("double-menu-active");
								ThemeChanger({ ...theme, "toggled": "double-menu-open" });
							} else {

								ThemeChanger({ ...theme, "toggled": "double-menu-close" });
							}
						}
					}

					break;
					// detached
				case "detached":
					if (theme.toggled === "detached-close") {
						ThemeChanger({ ...theme, "toggled": "" });
					} else {
						ThemeChanger({ ...theme, "toggled": "detached-close" });
					}
					break;
					// default
				case "default":
					ThemeChanger({ ...theme, "toggled": "" });
				}
				switch (navStyle) {
				case "menu-click":
					if (theme.toggled === "menu-click-closed") {
						ThemeChanger({ ...theme, "toggled": "" });
					}
					else {
						ThemeChanger({ ...theme, "toggled": "menu-click-closed" });
					}
					break;
					// icon-overlay
				case "menu-hover":
					if (theme.toggled === "menu-hover-closed") {
						ThemeChanger({ ...theme, "toggled": "" });
					} else {
						ThemeChanger({ ...theme, "toggled": "menu-hover-closed" });
					}
					break;
				case "icon-click":
					if (theme.toggled === "icon-click-closed") {
						ThemeChanger({ ...theme, "toggled": "" });
					} else {
						ThemeChanger({ ...theme, "toggled": "icon-click-closed" });
					}
					break;
				case "icon-hover":
					if (theme.toggled === "icon-hover-closed") {
						ThemeChanger({ ...theme, "toggled": "" });
					} else {
						ThemeChanger({ ...theme, "toggled": "icon-hover-closed" });
					}
					break;
				}
			}
		}
		else {
			if (theme.toggled === "close") {
				ThemeChanger({ ...theme, "toggled": "open" });
				setTimeout(() => {
					if (theme.toggled == "open") {
						const overlay = document.querySelector("#responsive-overlay");
						if (overlay) {
							overlay.classList.add("active");
							overlay.addEventListener("click", () => {
								const overlay = document.querySelector("#responsive-overlay");
								if (overlay) {
									overlay.classList.remove("active");
									menuClose();
								}
							});
						}
					}
					window.addEventListener("resize", () => {
						if (window.screen.width >= 992) {
							const overlay = document.querySelector("#responsive-overlay");
							if (overlay) {
								overlay.classList.remove("active");
							}
						}
					});
				}, 100);
			} else {
				ThemeChanger({ ...theme, "toggled": "close" });
			}
		}
	};

	//Cart function

	const maxDisplayItems = 5;

	const dispatch = useDispatch();
	const reduxCart = useSelector(state => state.cart);
	const [localCart, setLocalCart] = useState(cartProduct);
	const [remainingCount2, setRemainingCount2] = useState(0);
  
	// Combine local and redux carts whenever they change
	const combinedCart = [...localCart, ...reduxCart];
  
	useEffect(() => {
	  setRemainingCount2(combinedCart.length);
	}, [combinedCart]);
  
	const handleDelete = (id) => {
	  // Remove item from local cart
	  setLocalCart(localCart.filter(item => item.id !== id));
	  // Remove item from redux cart
	  dispatch(removeFromCart(id));
	};

	const [notifications, setNotifications] = useState([...initialNotifications]);

	const handleNotificationClose = (index) => {
		// Create a copy of the notifications array and remove the item at the specified index
		const updatedNotifications = [...notifications];
		updatedNotifications.splice(index, 1);
		setNotifications(updatedNotifications);

	};
	const [show1, setShow1] = useState(false);

	const handleClose1 = () => setShow1(false);
	const handleShow1 = () => setShow1(true);

	return (
		<Fragment>
			<header className="app-header">

				<div className="main-header-container container-fluid">
					<div className="header-content-left align-items-center">

						{/* logo */}
						<div className="header-element">
							<div className="horizontal-logo">
								<Link className="header-logo active" href={"/components/dashboards/dashboard1/"}>
									<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/desktop-logo.png`} alt="logo" className="desktop-logo" />
									<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/toggle-logo.png`} alt="logo" className="toggle-logo" />
									<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/desktop-dark.png`} alt="logo" className="desktop-dark" />
									<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/toggle-dark.png`} alt="logo" className="toggle-dark" />
									<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/desktop-white.png`} alt="logo" className="desktop-white" />
									<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/toggle-white.png`} alt="logo" className="toggle-white" />
								</Link>
							</div>
						</div>

						{/* Toggle icon sidebar */}
						<div className="header-element">
							<Link aria-label="Hide Sidebar" onClick={() => toggleSidebar()} className="sidemenu-toggle header-link animated-arrow hor-toggle horizontal-navtoggle" data-bs-toggle="sidebar" href="#!"><span></span></Link>
						</div>

						{/* Search field */}
						<div className="main-header-center ms-4 d-sm-none d-md-none d-lg-block form-group">
							<Form.Control
								type="text"
								className=" "
								id="typehead"
								placeholder="Search for results..."
								onClick={() => { }}
								autoComplete="off"
								ref={searchRef}
								defaultValue={InputValue}
								onChange={(ele => { myfunction(ele.target.value); setInputValue(ele.target.value); })}
							/>
							<Button variant="" className="btn"><i className="fas fa-search"></i></Button>
							{showa ?
								<Card className=" search-result position-relative z-index-9 search-fix  border mt-1 ">
									<Card.Header className="">
										<Card.Title as="h6" className="">Search result of {InputValue}</Card.Title>
									</Card.Header>
									<ListGroup className='my-2 search_drop'>
										{show2 ?
											NavData.map((e) =>
												<ListGroup.Item key={Math.random()} className="">
													<Link href={`${e.path}/`} className='search-result-item' onClick={() => { setShow1(false), setInputValue(""); }}><i className="fe fe-chevron-right me-2 d-inline-block"></i>{e.title}</Link>
												</ListGroup.Item>
											)
											: <b className={`${searchcolor} list-group-item`}>{searchval}</b>}
									</ListGroup>
								</Card>
								: ""}
						</div>
					</div>
					<div className="header-content-right">
						{/* Search field in small screen */}
						<div className="header-element header-search d-block d-sm-none">
							<Dropdown className="header_searchbar" autoClose="outside" >
								<Dropdown.Toggle as="a" href="#!" className="header-link dropdown-toggle" data-bs-toggle="dropdown">
									<svg xmlns="http://www.w3.org/2000/svg" className="header-link-icon" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
								</Dropdown.Toggle>

								<Dropdown.Menu as="ul" className="main-header-dropdown dropdown-menu dropdown-menu-end" data-popper-placement="none">
									<li>
										<Dropdown.Item as="span" className=" d-flex align-items-center" >
											<span className="input-group">
												<input type="text" className="form-control" placeholder="Search..." aria-label="Search input" aria-describedby="button-addon2" />
												{/* <button className="btn btn-primary" type="button" id="button-addon2">Search</button>*/}

												<button className="btn btn-primary" type="button" id="button-addon2">Search</button>
											</span>
										</Dropdown.Item>
									</li>
								</Dropdown.Menu>
							</Dropdown>
						</div>

						{/* country flag */}
						<Dropdown className="header-element country-selector">
							<Dropdown.Toggle variant='' className="header-link dropdown-toggle no-caret border-0" data-bs-auto-close="outside" data-bs-toggle="dropdown">
								<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/flags/us_flag.jpg`} className="rounded-circle header-link-icon" alt="image" />
							</Dropdown.Toggle>
							<Dropdown.Menu as="ul" className="main-header-dropdown dropdown-menu dropdown-menu-end" data-popper-placement="none">
								<li>
									<Link className="dropdown-item d-flex align-items-center" href="#!">
										<span className="avatar avatar-xs lh-1 me-2">
											<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/flags/us_flag.jpg`} alt="image" />
										</span>
										English
									</Link>
								</li>
								<li>
									<Link className="dropdown-item d-flex align-items-center" href="#!">
										<span className="avatar avatar-xs lh-1 me-2">
											<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/flags/spain_flag.jpg`} alt="img" />
										</span>
										Spanish
									</Link>
								</li>
								<li>
									<Link className="dropdown-item d-flex align-items-center" href="#!">
										<span className="avatar avatar-xs lh-1 me-2">
											<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/flags/french_flag.jpg`} alt="img" />
										</span>
										French
									</Link>
								</li>
								<li>
									<Link className="dropdown-item d-flex align-items-center" href="#!">
										<span className="avatar avatar-xs lh-1 me-2">
											<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/flags/germany_flag.jpg`} alt="img" />
										</span>
										German
									</Link>
								</li>
								<li>
									<Link className="dropdown-item d-flex align-items-center" href="#!">
										<span className="avatar avatar-xs lh-1 me-2">
											<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/flags/italy_flag.jpg`} alt="img" />
										</span>
										Italian
									</Link>
								</li>
								<li>
									<Link className="dropdown-item d-flex align-items-center" href="#!">
										<span className="avatar avatar-xs lh-1 me-2">
											<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/flags/russia_flag.jpg`} alt="img" />
										</span>
										Russian
									</Link>
								</li>
							</Dropdown.Menu>
						</Dropdown>

						{/* Toggle dark icon */}
						<div className="header-element header-theme-mode">
							<Link href="#!" className="header-link layout-setting" onClick={() => ToggleDark()}>
								<span className="light-layout">
									<svg xmlns="http://www.w3.org/2000/svg" className="header-link-icon" width="24" height="24" viewBox="0 0 24 24"><path d="M20.742 13.045a8.088 8.088 0 0 1-2.077.271c-2.135 0-4.14-.83-5.646-2.336a8.025 8.025 0 0 1-2.064-7.723A1 1 0 0 0 9.73 2.034a10.014 10.014 0 0 0-4.489 2.582c-3.898 3.898-3.898 10.243 0 14.143a9.937 9.937 0 0 0 7.072 2.93 9.93 9.93 0 0 0 7.07-2.929 10.007 10.007 0 0 0 2.583-4.491 1.001 1.001 0 0 0-1.224-1.224zm-2.772 4.301a7.947 7.947 0 0 1-5.656 2.343 7.953 7.953 0 0 1-5.658-2.344c-3.118-3.119-3.118-8.195 0-11.314a7.923 7.923 0 0 1 2.06-1.483 10.027 10.027 0 0 0 2.89 7.848 9.972 9.972 0 0 0 7.848 2.891 8.036 8.036 0 0 1-1.484 2.059z" /></svg>

								</span>
								<span className="dark-layout">

									<svg xmlns="http://www.w3.org/2000/svg" className="header-link-icon" width="24" height="24" viewBox="0 0 24 24"><path d="M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007S14.761 6.993 12 6.993 6.993 9.239 6.993 12zM12 8.993c1.658 0 3.007 1.349 3.007 3.007S13.658 15.007 12 15.007 8.993 13.658 8.993 12 10.342 8.993 12 8.993zM10.998 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2h-3zm17 0h3v2h-3zM4.219 18.363l2.12-2.122 1.415 1.414-2.12 2.122zM16.24 6.344l2.122-2.122 1.414 1.414-2.122 2.122zM6.342 7.759 4.22 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z" /></svg>

								</span>
							</Link>

						</div>

						{/* Shopping cart */}
						<Dropdown className="header-element cart-dropdown" autoClose="outside">
							<Dropdown.Toggle as="a" href='#!' role='button' className="header-link dropdown-toggle" data-bs-auto-close="outside" data-bs-toggle="dropdown">
								<svg xmlns="http://www.w3.org/2000/svg" className="header-link-icon" width="24" height="24" viewBox="0 0 24 24"><path d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921zM17.307 15h-6.64l-2.5-6h11.39l-2.25 6z" /><circle cx="10.5" cy="19.5" r="1.5" /><circle cx="17.5" cy="19.5" r="1.5" /></svg>
								<span className="badge bg-warning rounded-pill header-icon-badge" id="cart-icon-badge">{remainingCount2}</span>
							</Dropdown.Toggle>

							<Dropdown.Menu as="ul" className="main-header-dropdown dropdown-menu dropdown-menu-end" data-popper-placement="none" placement="bottom-start"> 
								<div className="p-3">
									<div className="d-flex align-items-center justify-content-between">
										<p className="mb-0 fs-15 fw-semibold">Shopping Cart</p>
										<span className="badge bg-indigo" id="cart-data">Items {remainingCount2} {remainingCount2 !== 1 ? "" : ""}</span>
									</div>
								</div>
								<div><hr className="dropdown-divider" /></div>
								<ul className="list-unstyled mb-0" id="header-cart-items-scroll">
								{combinedCart.slice(0, maxDisplayItems).map((cart, index) => (
                    <Fragment key={index}>
                      {!combinedCart.includes(cart.id) && (
										<Dropdown.Item as="li" key={Math.random()}>
											<div className="d-flex align-items-start cart-dropdown-item">
												<span className="avatar avatar-rounded br-5 me-3">
													<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}${cart.src}`} alt="" />
												</span>
												<div className="flex-grow-1">
													<div className="d-flex align-items-center justify-content-between mb-0">
														<div className="mb-0">
															<Link className="text-muted fs-13" href="/components/pages/e-commerce/cart">{cart.name}</Link>
															<div className="fw-semibold text-dark fs-12">{cart.quantity}</div>
														</div>
														<div>
															<Link href="#!" className="header-cart-remove float-end dropdown-item-close me-2" onClick={() => handleDelete(cart.id)}><i className="fe fe-trash-2 text-danger"></i></Link>
														</div>
													</div>
												</div>
											</div>
										</Dropdown.Item>
								)}
								</Fragment>
							  ))}
								</ul>
								<div className={`p-2 bg-primary-transparent d-flex justify-content-between align-items-center empty-header-item border-top ${remainingCount2 === 0 ? "d-none" : "d-block"}`}>

									<div className="">
										<Link href="/components/pages/e-commerce/checkout" className="btn btn-sm btn-primary btn-w-xs">checkout</Link>
									</div>
									<div>
										<span className="text-dark fw-semibold">Sub Total : $ 485.93</span>
									</div>
								</div>
								<div className={`p-5 empty-item  ${remainingCount2 === 0 ? "d-block" : "d-none"}`}>
									<div className="text-center">
										<span className="avatar avatar-xl avatar-rounded bg-warning-transparent">
											<i className="ri-shopping-cart-2-line fs-2"></i>
										</span>
										<h6 className="fw-bold mb-1 mt-3">Your Cart is Empty</h6>
										<span className="mb-3 fw-normal fs-13 d-block">Add some items to make me happy :)</span>
										<Link href="/components/pages/e-commerce/shop" className="btn btn-primary btn-wave btn-sm m-1" data-abc="true">continue shopping <i className="bi bi-arrow-right ms-1"></i></Link>
									</div>
								</div>

							</Dropdown.Menu>
						</Dropdown>

						{/* notifiation */}
						<Dropdown className="header-element notifications-dropdown" autoClose="outside">
							<Dropdown.Toggle as="a" href='#!' role='button' className="header-link dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside" id="messageDropdown" aria-expanded="false">
								<svg xmlns="http://www.w3.org/2000/svg" className="header-link-icon" width="24" height="24" viewBox="0 0 24 24"><path d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z" /></svg>
								<span className="badge bg-secondary rounded-pill header-icon-badge pulse pulse-secondary" id="notification-icon-badge">{notifications.length}</span>
							</Dropdown.Toggle>
							<Dropdown.Menu className="main-header-dropdown dropdown-menu dropdown-menu-start" data-popper-placement="none">
								<div className="p-3">
									<div className="d-flex align-items-center justify-content-between">
										<p className="mb-0 fs-17 fw-semibold">Notifications</p>
										<span className="badge bg-secondary-transparent" id="notifiation-data">{`${notifications.length} Unread`}</span>
									</div>
								</div>
								<div className="dropdown-divider"></div>
								<ul className="list-unstyled mb-0" id="header-notification-scroll">
									<SimpleBar id="header-notification-scroll">
										{notifications.map((notification, index) => (
											<Dropdown.Item as="li" key={index} className="p-3">

												<div className="d-flex align-items-start">
													<div className="pe-3">
														<span className={`avatar bg-${notification.avatarcolor} rounded-3`}><i className={notification.icon}></i></span>
													</div>
													<div className="flex-grow-1 d-flex align-items-center justify-content-between">
														<div>
															<p className="mb-0 fw-semibold"><Link href="/components/apps/notifications" >{notification.name}</Link></p>
															<span className="text-muted fw-normal fs-12 header-notification-text">{notification.time}</span>
														</div>
														<div>
															<Link href="#!" className="min-w-fit-content text-muted me-1 dropdown-item-close1" onClick={() => handleNotificationClose(index)}><i className="ti ti-x fs-16"></i></Link>
														</div>
													</div>
												</div>
											</Dropdown.Item>
										))}
									</SimpleBar>

								</ul>
								<div className={`p-2 empty-header-item1 border-top ${notifications.length === 0 ? "d-none" : "d-block"}`}>
									<div className="d-grid">
										<Link href="/components/apps/notifications" className="btn btn-primary btn-sm">View All</Link>
									</div>
								</div>
								<div className={`p-5 empty-item1 ${notifications.length === 0 ? "d-block" : "d-none"}`}>
									<div className="text-center">
										<span className="avatar avatar-xl avatar-rounded bg-secondary-transparent">
											<i className="ri-notification-off-line fs-2"></i>
										</span>
										<h6 className="fw-semibold mt-3">No New Notifications</h6>
									</div>
								</div>
							</Dropdown.Menu>
						</Dropdown>

						{/* related apps */}
						<Dropdown className="header-element header-shortcuts-dropdown d-md-block d-none">
							<Dropdown.Toggle variant='' href="#!" className="header-link dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside" id="notificationDropdown" aria-expanded="false">
								<svg xmlns="http://www.w3.org/2000/svg" className="header-link-icon" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" /></svg>
							</Dropdown.Toggle>
							<Dropdown.Menu as="ul" className="main-header-dropdown header-shortcuts-dropdown dropdown-menu pb-0 dropdown-menu-end" aria-labelledby="notificationDropdown">
								<div className="p-3">
									<div className="d-flex align-items-center justify-content-between">
										<p className="mb-0 fs-17 fw-semibold">Related Apps</p>
									</div>
								</div>
								<div className="dropdown-divider mb-0"></div>
								<div className="main-header-shortcuts p-2" id="header-shortcut-scroll">
									<div className="row g-2">
										<div className="col-4">
											<Link href="#!">
												<div className="text-center p-3 related-app">
													<span className="avatar avatar-sm avatar-rounded">
														<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/apps/figma.png`} alt="" />
													</span>
													<span className="d-block fs-12">Figma</span>
												</div>
											</Link>
										</div>
										<div className="col-4">
											<Link href="#!">
												<div className="text-center p-3 related-app">
													<span className="avatar avatar-sm avatar-rounded">
														<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/apps/microsoft-powerpoint.png`} alt="" />
													</span>
													<span className="d-block fs-12">Power Point</span>
												</div>
											</Link>
										</div>
										<div className="col-4">
											<Link href="#!">
												<div className="text-center p-3 related-app">
													<span className="avatar avatar-sm avatar-rounded">
														<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/apps/microsoft-word.png`} alt="" />
													</span>
													<span className="d-block fs-12">MS Word</span>
												</div>
											</Link>
										</div>
										<div className="col-4">
											<Link href="#!">
												<div className="text-center p-3 related-app">
													<span className="avatar avatar-sm avatar-rounded">
														<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/apps/calender.png`} alt="" />
													</span>
													<span className="d-block fs-12">Calendar</span>
												</div>
											</Link>
										</div>
										<div className="col-4">
											<Link href="#!">
												<div className="text-center p-3 related-app">
													<span className="avatar avatar-sm avatar-rounded">
														<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/apps/sketch.png`} alt="" />
													</span>
													<span className="d-block fs-12">Sketch</span>
												</div>
											</Link>
										</div>
										<div className="col-4">
											<Link href="#!">
												<div className="text-center p-3 related-app">
													<span className="avatar avatar-sm avatar-rounded">
														<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/apps/google-docs.png`} alt="" />
													</span>
													<span className="d-block fs-12">Docs</span>
												</div>
											</Link>
										</div>
										<div className="col-4">
											<Link href="#!">
												<div className="text-center p-3 related-app">
													<span className="avatar avatar-sm avatar-rounded">
														<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/apps/google.png`} alt="" />
													</span>
													<span className="d-block fs-12">Google</span>
												</div>
											</Link>
										</div>
										<div className="col-4">
											<Link href="#!">
												<div className="text-center p-3 related-app">
													<span className="avatar avatar-sm avatar-rounded">
														<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/apps/translate.png`} alt="" />
													</span>
													<span className="d-block fs-12">Translate</span>
												</div>
											</Link>
										</div>
										<div className="col-4">
											<Link href="#!">
												<div className="text-center p-3 related-app">
													<span className="avatar avatar-sm avatar-rounded">
														<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/apps/google-sheets.png`} alt="" />
													</span>
													<span className="d-block fs-12">Sheets</span>
												</div>
											</Link>
										</div>
									</div>
								</div>
								<div className="p-3 border-top">
									<div className="d-grid">
										<Link href="#!" className="btn btn-primary">View All</Link>
									</div>
								</div>
							</Dropdown.Menu>
						</Dropdown>

						{/* Fullscreen icon */}
						<div className="header-element header-fullscreen">

							<Link onClick={toggleFullScreen} href="#!" className="header-link">
								{fullScreen ? (
									<i className="bx bx-exit-fullscreen full-screen-close header-link-icon"></i>
								) : (

									<i className="bx bx-fullscreen full-screen-open header-link-icon"></i>
								)}
							</Link>

						</div>

						{/* Right sidebar */}
						<div className="header-element d-md-block d-none" onClick={handleShow1}>
							<Link href="#!" className="header-link" data-bs-toggle="offcanvas" data-bs-target="#sidebar-canvas">
								<svg xmlns="http://www.w3.org/2000/svg" className="header-link-icon" width="24" height="24" viewBox="0 0 24 24"><path d="M4 6h16v2H4zm4 5h12v2H8zm5 5h7v2h-7z" /></svg>
							</Link>
						</div>

						{/* Profile */}
						<Dropdown className="header-element">
							<Dropdown.Toggle variant='' href="#!" className="header-link dropdown-toggle" id="mainHeaderProfile" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
								<div className="d-flex align-items-center">
									<div className="me-sm-2 me-0">
										<img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/faces/2.jpg`} alt="img" width="32" height="32" className="rounded-circle" />
									</div>
									<div className="d-xl-block d-none">
										<p className="fw-semibold mb-0 lh-1">Ashton Cox</p>
										<span className="op-7 fw-normal d-block fs-11">Web Developer</span>
									</div>
								</div>
							</Dropdown.Toggle>
							<Dropdown.Menu as="ul" className="main-header-dropdown dropdown-menu pt-0 overflow-hidden header-profile-dropdown dropdown-menu-end" aria-labelledby="mainHeaderProfile">
								<li><Link className="dropdown-item d-flex border-bottom" href="/components/pages/profile"><i className="far fa-user-circle fs-16 me-2 op-7"></i>Profile</Link></li>
								<li><Link className="dropdown-item d-flex border-bottom" href="/components/pages/mail/chat"><i className="far fa-smile fs-16 me-2 op-7"></i>Chat</Link></li>
								<li><Link className="dropdown-item d-flex border-bottom" href="/components/pages/mail/mail"><i className="far fa-envelope  fs-16 me-2 op-7"></i>Inbox <span className="badge bg-success-transparent ms-auto">25</span></Link></li>
								<li><Link className="dropdown-item d-flex border-bottom border-block-end" href="/components/pages/mail/chat"><i className="far fa-comment-dots fs-16 me-2 op-7"></i>Messages</Link></li>
								<li><Link className="dropdown-item d-flex border-bottom" href="/components/pages/mail/mail-settings"><i className="far fa-sun fs-16 me-2 op-7"></i>Settings</Link></li>
								<li><Link className="dropdown-item d-flex" href="/components/pages/authentication/sign-in"><i className="far fa-arrow-alt-circle-left fs-16 me-2 op-7"></i>Sign Out</Link></li>
							</Dropdown.Menu>
						</Dropdown>

						{/* Switcher */}
						<div className="header-element">
							<Link onClick={() => swichermainright()} href="#!" className="header-link switcher-icon" data-bs-toggle="offcanvas" data-bs-target="#switcher-canvas">
								<svg xmlns="http://www.w3.org/2000/svg" className="header-link-icon" width="24" height="24" viewBox="0 0 24 24"><path d="M12 16c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.084 0 2 .916 2 2s-.916 2-2 2-2-.916-2-2 .916-2 2-2z" /><path d="m2.845 16.136 1 1.73c.531.917 1.809 1.261 2.73.73l.529-.306A8.1 8.1 0 0 0 9 19.402V20c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2v-.598a8.132 8.132 0 0 0 1.896-1.111l.529.306c.923.53 2.198.188 2.731-.731l.999-1.729a2.001 2.001 0 0 0-.731-2.732l-.505-.292a7.718 7.718 0 0 0 0-2.224l.505-.292a2.002 2.002 0 0 0 .731-2.732l-.999-1.729c-.531-.92-1.808-1.265-2.731-.732l-.529.306A8.1 8.1 0 0 0 15 4.598V4c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2v.598a8.132 8.132 0 0 0-1.896 1.111l-.529-.306c-.924-.531-2.2-.187-2.731.732l-.999 1.729a2.001 2.001 0 0 0 .731 2.732l.505.292a7.683 7.683 0 0 0 0 2.223l-.505.292a2.003 2.003 0 0 0-.731 2.733zm3.326-2.758A5.703 5.703 0 0 1 6 12c0-.462.058-.926.17-1.378a.999.999 0 0 0-.47-1.108l-1.123-.65.998-1.729 1.145.662a.997.997 0 0 0 1.188-.142 6.071 6.071 0 0 1 2.384-1.399A1 1 0 0 0 11 5.3V4h2v1.3a1 1 0 0 0 .708.956 6.083 6.083 0 0 1 2.384 1.399.999.999 0 0 0 1.188.142l1.144-.661 1 1.729-1.124.649a1 1 0 0 0-.47 1.108c.112.452.17.916.17 1.378 0 .461-.058.925-.171 1.378a1 1 0 0 0 .471 1.108l1.123.649-.998 1.729-1.145-.661a.996.996 0 0 0-1.188.142 6.071 6.071 0 0 1-2.384 1.399A1 1 0 0 0 13 18.7l.002 1.3H11v-1.3a1 1 0 0 0-.708-.956 6.083 6.083 0 0 1-2.384-1.399.992.992 0 0 0-1.188-.141l-1.144.662-1-1.729 1.124-.651a1 1 0 0 0 .471-1.108z" /></svg>
							</Link>
						</div>
					</div>
				</div>
			</header>
			<Offcanvas placement='end' show={show1} onHide={handleClose1} className="sidebar offcanvas offcanvas-end" tabIndex={-1} id="sidebar-right">
				<Tab.Container defaultActiveKey="first">
					<Offcanvas.Header closeButton className="offcanvas-header border-bottom bg-light">
						<h6 className="offcanvas-title text-default" id="offcanvasRightLabel22">NOTIFICATIONS</h6>

					</Offcanvas.Header>
					<Offcanvas.Body className="offcanvas-body p-0">
						<div className="panel-body tabs-menu-body p-0 border-0">

							<div className="tabs-menu p-3">
								<Nav variant="tabs" className="panel-tabs" defaultActiveKey="first">
									<Nav.Item>
										<Nav.Link eventKey="first"><svg xmlns="http://www.w3.org/2000/svg" className="side-menu__icon" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" /></svg>Chat</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="second"><svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" className="side-menu__icon" height="24" viewBox="0 0 24 24" width="24"><g><path d="M0,0h24v24H0V0z" fill="none" /></g><g><path d="M12,18.5c0.83,0,1.5-0.67,1.5-1.5h-3C10.5,17.83,11.17,18.5,12,18.5z M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10 c5.52,0,10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8c4.41,0,8,3.59,8,8S16.41,20,12,20z M16,11.39 c0-2.11-1.03-3.92-3-4.39V6.5c0-0.57-0.43-1-1-1s-1,0.43-1,1V7c-1.97,0.47-3,2.27-3,4.39V14H7v2h10v-2h-1V11.39z M14,14h-4v-3 c0-1.1,0.9-2,2-2s2,0.9,2,2V14z" /></g></svg>Notifications</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="third"><svg xmlns="http://www.w3.org/2000/svg" className="side-menu__icon" height="24" version="1.1" width="24" viewBox="0 0 24 24"><path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6M12,11C11.17,11 10.5,10.33 10.5,9.5C10.5,8.67 11.17,8 12,8C12.83,8 13.5,8.67 13.5,9.5C13.5,10.33 12.83,11 12,11Z" /></svg> Friends</Nav.Link>
									</Nav.Item>

								</Nav>
							</div>

							<Tab.Content>
								<Tab.Pane className='p-0 border-0' eventKey="first">
									{pane1.map((item, index) => (
										<div key={index} className={`list d-flex align-items-center border-bottom ${item} p-3`}>
											<div className="">
												<span className={`avatar bg-${item.id == 1 ? "primary" :
													item.id == 2 ? "danger" :
														item.id == 3 ? "info" :
															item.id == 4 ? "warning" :
																item.id == 5 ? "success" :
																	item.id == 6 ? "pink" :
																		item.id == 7 ? "purple" : "secondary"} rounded-circle avatar-md`}>
													{item.avatar} </span>
											</div>
											<Link className="wrapper w-100 ms-3" href="#!">
												<p className="mb-0 d-flex">
													<b>{item.title}</b>
												</p>
												<div className="d-flex justify-content-between align-items-center">
													<div className="d-flex align-items-center">
														<i className="mdi mdi-clock text-muted me-1 fs-11"></i>
														<small className="text-muted ms-auto">{item.time}</small>
														<p className="mb-0"></p>
													</div>
												</div>
											</Link>
										</div>
									))}
								</Tab.Pane>
								<Tab.Pane className='p-0 border-0' eventKey="second">
									<ListGroup variant="flush">
										{pane2.map((message, index) => (
											<ListGroup.Item key={index} className="d-flex align-items-center border-0">
												<div className="me-3">
													<img className="avatar avatar-md rounded-circle cover-image" src={`${process.env.NODE_ENV === "production" ? basePath : ""}${message.image}`} alt="img" />
												</div>
												<div>
													<strong>{message.name}</strong> {message.message}
													<div className="small text-muted">
														{message.time}
													</div>
												</div>
											</ListGroup.Item>
										))}
									</ListGroup>
								</Tab.Pane>
								<Tab.Pane className='p-0 border-0' eventKey="third">
									<ListGroup variant="flush">
										{pane3.map(item => (
											<ListGroup.Item className="d-flex align-items-center border-0" key={item.id}>
												<div className="me-2">
													<img className="avatar avatar-md rounded-circle cover-image" src={`${process.env.NODE_ENV === "production" ? basePath : ""}${item.imgSrc}`} alt="img" />
												</div>
												<div>
													<div className="fw-semibold">{item.name}</div>
												</div>
												<div className="ms-auto">
													<Link href="#!" className="btn btn-sm btn-outline-light btn-rounded">
														<i className="fe fe-message-square fs-16"></i>
													</Link>
												</div>
											</ListGroup.Item>
										))}
									</ListGroup>
								</Tab.Pane>
							</Tab.Content>
						</div>
					</Offcanvas.Body>
				</Tab.Container>
			</Offcanvas>
		</Fragment>
	);
}

const mapStateToProps = (state) => ({
	local_varaiable: state
});

export default connect(mapStateToProps, { ThemeChanger })(Header);

