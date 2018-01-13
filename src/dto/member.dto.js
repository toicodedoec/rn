class MemberDto {
    firstName = '';
    lastName = '';
    signedUp = false;
    role = '';
    emailVerified = false;
    id = undefined;
    email = '';
    realm = '';

    constructor(firstName, lastName, signedUp, role) {
        Object.assign(this, { firstName, lastName, signedUp, role });
    }

    init(response) {
    }
}

export default MemberDto;