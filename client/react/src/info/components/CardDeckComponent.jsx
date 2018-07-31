import React from 'react';
import {
    Row,
    Col
} from "reactstrap";
import CardComponent from "./CardComponent";

class CardDeckComponent extends React.Component {

    render() {
        const {stateRows} = this.props;
        const heading = (section) => {
            if (section.contacts.length !== 0) {
                return [<Row>
                    <Col>
                        <h1>
                            {section.name}
                        </h1>
                    </Col>
                </Row>]
            }
        };
        return <div className="w-100">
            {stateRows && stateRows.map((section, index) => [
                section.contacts !== 0 && heading(section),
                <Row>
                    {
                        section.contacts.map((i, index) => <Col key={`column-${index}`} xs={12} md={6} lg={6}>
                            <CardComponent
                                key={`card-${index}`}
                                data={i}
                            />
                        </Col>)
                    }
                </Row>
            ])
            }
        </div>
    }
}

export default CardDeckComponent;
