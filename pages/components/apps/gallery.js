import React from "react";
import { Col, Row, Card, Breadcrumb } from "react-bootstrap";
import dynamic from "next/dynamic";
import Seo from "../../../shared/layout-components/seo/seo";
import Pageheader from "../../../shared/layout-components/pageheader/pageheader";
// const Gallery2 = dynamic(
// 	() => import("../../../shared/data/apps/gallery"),
// 	{ ssr: false }
// );
import { Gallery2 } from "../../../shared/data/apps/gallery";
const Gallery = () => {

	return (
		<div>
			<Seo title="Gallery" />
			<Pageheader title="GALLERY" heading="Apps" active="Gallery" />
			{/* <!-- Row1 --> */}
			<Row >
				<Col lg={12} md={12}>

					<Gallery2 />

				</Col>
			</Row>
			{/* <!-- End Row1 --> */}
		</div>
	);
};
Gallery.layout = "Contentlayout";

export default Gallery;
