import MemberDto from '../dto/member.dto';

class MemberDataParser {
    convertResponseToDto = response => {
        let dto = new MemberDto();
        return {
            ...response,
            uid: response.id,
            firstName: response.username.split(' ')[0],
            lastName: response.username.split(' ')[1],
            role: 'Admin',
            signedUp: true
        };
    }
}

export default new MemberDataParser();