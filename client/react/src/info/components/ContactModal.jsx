import React from 'react';
import {Card, CardHeader, CardImg, CardText, CardFooter, ModalBody, Button} from "reactstrap";
import me from '../../../../../resources/images/me.jpeg'

class ContactModal extends React.Component {
    render() {
        const {data} = this.props;
        console.log(data);
        return <ModalBody className="p-0">
            <Card className="card-no-borders">
                <div className="card-row card-header">
                    <CardImg src={me}
                             className="cover-image pr-3" alt={`${data.person.id}`}/>
                    <h1>{data.person.userName}</h1>
                </div>
                <div className="card-row">
                    <div className="card-column" style={{width: 128}}>
                    </div>
                    <div className="card-column" style={{width: 325}}>
                        <div className="card-row d-flex justify-content-between">
                            <h5>Kontaktní údaje</h5>
                        </div>
                        <div className="card-row d-flex justify-content-between">
                            <p>Telefon</p>
                            <p>{data.person.phone}</p>
                        </div>
                        <div className="card-row d-flex justify-content-between">
                            <p>Email</p>
                            <p>{data.person.email}</p>
                        </div>
                        <div className="card-row d-flex justify-content-between">
                            <p>Skype</p>
                            <p>{data.person.skype}</p>
                        </div>
                        <div className="card-row d-flex justify-content-between">
                            <h5>Umístění</h5>
                        </div>
                        <div className="card-row d-flex justify-content-between">
                            <p>Adresa</p>

                            <p>{data.person.address}</p>
                        </div>
                        <div className="card-row d-flex justify-content-between">
                            <p>Kancelář</p>
                            <p>{data.person.office}</p>
                        </div>
                        <div className="card-row d-flex justify-content-between">
                            <p>Oddělení</p>
                            <p>{data.person.department}</p>
                        </div>
                        <div className="card-row d-flex justify-content-between">
                            <p>Pracovní pozice</p>
                            <p>{data.person.position}</p>
                        </div>
                    </div>
                </div>
            </Card>
        </ModalBody>
    }
}

export default ContactModal;

