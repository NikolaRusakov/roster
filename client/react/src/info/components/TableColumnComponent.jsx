import React from 'react';
import {connect} from "react-redux";
import {Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import ContactModal from "./ContactModal";
import {show} from "../reducers/ModalActions";
import ellipsis from '../../../../../resources/images/ellipsis-v.svg';
import me from '../../../../../resources/images/me.jpeg'

class TableColumnComponent extends React.Component {

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
        const {index, i} = this.props;

        return <tr>
            <td scope="row">
                {i.id && <img src={me} className="thumbnail-image"/>}
            </td>
            <td>
                <span id={`name-${index}`} title={`jméno a příjmení`}>{i.userName && i.userName}</span>
            </td>
            <td>
                {i.email &&
                <a id={`email-${index}`} href={`mailto:${i.email}`} title={`emailová adresa`}>{i.email}</a>}
            </td>
            <td>
                {
                    i.phone && i.phone.length < 10 &&
                    <a id={`phone-${index}`} href={`tel:${i.phone}`} title={`telefonní číslo`}>{i.phone}</a>
                }
                {
                    i.phone && i.phone.length > 9 &&
                    <div>
                        <a id={`phone-${index}`} href={`tel:${i.phone}`}
                           title={`telefonní číslo`}>{i.phone.slice(0, 8)}</a>
                        <span> &#44; </span>
                        <a id={`phone-${index}`} href={`tel:${i.phone}`}
                           title={`telefonní číslo`}>{i.phone.slice(9, -1)}</a>
                    </div>
                }
            </td>
            <td>
                {i.skype && <a id={`skype-${index}`} href={`skype:${i.skype}?chat`} title={`skype`}>{i.skype}</a>}
            </td>
            <td>
                <span id={`office-${index}`}>{i.office && i.office}</span>
            </td>
            <td>
                <UncontrolledDropdown>
                    <DropdownToggle className="dropdown-toggle-reset btn-secondary-reset" caret>
                        <img src={ellipsis} title="detaily"
                             style={{width: 10, height: 16}}
                        />
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem
                            onClick={() => this.handleClick(i)}>detaily</DropdownItem>
                        <DropdownItem divider/>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </td>
        </tr>
    }
}

export default connect()(TableColumnComponent);
