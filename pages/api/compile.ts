import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { language, code, input } = req.body;
    try {
        const response = await fetch('http://localhost:4000/', {//http://localhost:4000/compile
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                language,
                code,
                input,
            }),
        });

        const responseData = await response.json()
        res.status(500).json({ output: responseData!.output, status: 'done' });

    } catch (error) {
        res.status(500).json({ status: error });
    }
}