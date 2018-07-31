import 'babel-polyfill';
import './infoApi';


export default class infoApi {

    static callApi = async (route) => {
        return await fetch(`${serverContextPath}${route}`)
            .then(data => data.json())
            .catch((body) => {
                    return body.message;
                }
            );
    };

}
