import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Container, Row, Col, Input, InputGroupAddon, InputGroup} from 'reactstrap';
import {actions, CONTACT_SEARCH, searchTerm, infoListFetchIfNeeded, infoListFetch} from "../actions/infoActions";

import infoApi from "../api/infoApi";
import TableComponent from '../components/TableComponent';
import CardDeckComponent from '../components/CardDeckComponent';
import Loader from "../components/Loader";
import info from '../../../../../resources/images/info.png'
import search from '../../../../../resources/images/search.svg'


class InfoPage extends React.Component {
    static layouts = ['tabulka', 'karty'];
    static  unnamed = 'netříděné';
    state = {
        term: '',
        contactsData: [],
        layout: InfoPage.layouts[0],
    };

    componentDidMount() {
        this.props.dispatch(infoListFetch(infoApi.callApi('info')));
    }


    onClickRadioButton = () => {
        const {layout} = this.state;
        this.setState({
            layout: layout === InfoPage.layouts[0] ? InfoPage.layouts[1] : InfoPage.layouts[0]
        });
    };

    onChangeHandle = (e) => {
        let {data} = this.props;
        let newData = []
        const deaccentedValue = e.target.value.toLowerCase();
        data.rows.data.map((i) => {
            newData = [
                ...newData,
                {
                    'name': i.name,
                    'contacts': []
                }
            ];
            i.contacts.filter(person => {
                //#TODO Object.values(person) zmensit range hledani, hledat uvnitr pole ['jmeno','telefon']includes(e.target.value)
                let res = Object.values(person).some(val => val !== null && val.toLowerCase().includes(deaccentedValue));
                if (res === true) {
                    newData.map(key =>
                        key.name === i.name && key.contacts.push(person)
                    )
                }
            })
        });
        this.setState({
            term: e.target.value,
            contactsData: newData
        })
    };

    render() {
        let {data} = this.props;
        const {contactsData, layout} = this.state;
        const arrayMove = (arr, fromIndex, toIndex) => {
            const element = arr[fromIndex];
            arr.splice(fromIndex, 1);
            arr.splice(toIndex, 0, element);
        };
        data && Object.values(data).map((value, index, array) => {
                return value.name === InfoPage.unnamed && arrayMove(data, index, array.length - 1);
            }
        );

        return (
            <div className="info-layout ">
                <nav id="navbar-spy" className="navbar navbar-light bg-light sticky-top py-2 ">
                    <Container>
                        <Row>
                            <Col lg={4}>
                                <div className="align-self-center align-items-baseline">
                                    <a className="navbar-brand" href="#">
                                        <img id="brand" alt="Brand" name="logo"
                                             src={info}/>
                                    </a>
                                </div>
                            </Col>
                            <Col lg={4}>
                                <InputGroup id="search-bar" size="lg">
                                    <InputGroupAddon className="px-3">
                                        <img src={search}/>
                                    </InputGroupAddon>
                                    <Input className="search-input form-control px-0"
                                           placeholder="Hledat" onChange={this.onChangeHandle}/>
                                </InputGroup>

                            </Col>
                            <Col lg={4} className="d-flex">
                                <div className="align-self-center ml-auto">
                                    <input type="checkbox" id="btn-control"/>
                                    <label className="switch">
                                        <input type="checkbox" onChange={() => this.onClickRadioButton()}/>
                                        <div className="pl-1 ">
                                        </div>
                                        <h6 className="pl-1 tab">{layout}</h6>
                                        <h6 className="car">{layout}</h6>
                                    </label>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </nav>

                <Container>
                    <Row>
                        <Col lg={12}>
                            {
                                data && data.length !== 0 ?
                                    layout === InfoPage.layouts[0] ?
                                        <TableComponent
                                            key={`table-1`}
                                            stateRows={contactsData.length === 0 ? data : contactsData}
                                        />
                                        :
                                        <CardDeckComponent
                                            key={`card-1`}
                                            stateRows={contactsData.length === 0 ? data : contactsData}
                                        /> :
                                    <Loader/>
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default connect((state, props) => {

    return {
        data: state.app.infoList,
    }
})(InfoPage);
