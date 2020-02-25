import lodash from 'lodash';
import { readFileSync }  from 'fs';
export default (firstConfig, secondConfig) => {
    const firstData = readFileSync(firstConfig, {encoding: 'utf-8'}, function(err, data) {
        if (err) {
            return err;
        } else {
           return JSON.parse(data);
        }
    })
    const secondData = readFileSync(secondConfig, {encoding: 'utf-8'}, function(err, data) {
        if (err) {
            return err;
        } else {
           return JSON.parse(data);
        }
    })

}