import * as httpRequest from '~/utils/httpRequest';

export const search = async (q, type = 'less') => {
    try {
        // await: doi api duoc goi
        const res = await httpRequest.get('users/search', {
            params: {
                q,
                type,
            },
        });
        return res.data; // res.data: lay ra data tim dc
    } catch (error) {
        console.log(error);
    }
};
