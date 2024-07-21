// interface auth
export interface LOGIN_DATA {
    email: string;
    password: string;
}

export interface REGISTER_DATA {
    username: string;
    email: string;
    password: string;
}


// interface sfind



// interface profile


// interface message
export interface QUERY_MESSAGE {
    sfindId: string;
    des: string;
}
export interface CREATE_TOKEN_SFIND {
    sfindId: string;
    password: string;
}
