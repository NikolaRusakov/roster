import React from 'react';
import {flatten} from "lodash-es";
import {Table} from "reactstrap";
import TableColumnComponent from "./TableColumnComponent";
import Loader from "./Loader";

class TableComponent extends React.Component {

    render() {
        const {stateRows} = this.props;
        const heading = (index, section) => {
            if (index === 0) {

                return <tr>
                    <th colSpan={6} className="p-0">
                        <h1>{section.name}</h1>
                    </th>
                </tr>;
            }
        };
        if (!stateRows) {
            return <Loader/>
        }
        const sections = stateRows && stateRows.map(section => section.contacts.map((i, index) => [
                heading(index, section),
                <TableColumnComponent
                    tag={index}
                    i={i}
                    index={index}
                />
            ])
        );

        const flatContacts = flatten(sections);
        return <Table id="contacts-table">
            <tbody>
            {flatContacts && flatContacts}
            </tbody>
        </Table>
    }
}

export default TableComponent;
