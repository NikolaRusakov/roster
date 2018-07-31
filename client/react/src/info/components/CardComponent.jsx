import ContactModal from "./ContactModal";
import React from 'react';
import {connect} from "react-redux";
import {
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Card,
    CardText,
    Row,
    Col
} from "reactstrap";
import {show} from "../reducers/ModalActions";
import ellipsis from '../../../../../resources/images/ellipsis-v.svg'
import me from '../../../../../resources/images/me.jpeg'

class CardComponent extends React.Component {

    handleClick = (person: ContactRO) => {
        this.props.dispatch(show(ContactModal,
            {
                data: {person}
            },
            'Detaily',
            {
                size: 'lg'
            }
        ))
    };

    render() {
        const {data} = this.props;
        return <Card className="w-100 p-3 my-3 card-fixed-height">


            <div className="card-wrapping">
                <div className="card-row">
                    <div className="card-column pr-1">
                        <div className="card-column-image">
                            {data.id &&
                            <img src={me}
                                 className="thumbnail-image-reusable"/>}
                        </div>
                    </div>
                    <div className="card-column w-100">
                        <div className="card-row heading">
                            <CardText>
                                {data.userName}
                            </CardText>
                            <UncontrolledDropdown>
                                <DropdownToggle className="dropdown-toggle-reset btn-secondary-reset" caret>
                                    <img src={ellipsis} title="detaily"
                                         style={{width: 10, height: 16}}
                                    />
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem
                                        onClick={() => this.handleClick(data)}>detaily</DropdownItem>
                                    <DropdownItem divider/>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                        <div className="content">

                            <div className="content-text">
                                {data.email && <small className="basis">Email</small>}
                                {data.email &&
                                <a className="text-overflow" href={`mailto:${data.email}`}
                                   title={`emailová adresa`}>{data.email}</a>}
                            </div>

                            <div className="content-text">
                                {data.phone && <small className="basis">Telefon</small>}
                                {data.phone &&
                                <a href={`tel:${data.phone}`} title={`telefonní číslo`}>{data.phone}</a>}
                            </div>

                            <div className="content-text">
                                {data.skype && <small className="basis">Skype</small>}
                                {data.skype && <a href={`skype:${data.skype}?chat`} title={`skype`}>{data.skype}</a>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    }
}

export default connect()(CardComponent);
