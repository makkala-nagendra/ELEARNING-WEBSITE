import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
const client = new MongoClient(uri);


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { contentID, language, topicNo, subTopicNo, list } = req.body;
    try {
        // Connect to the MongoDB server
        await client.connect();
        // Get the database and collection
        const db = client.db('main');
        const collection = db.collection('topics');
        const mdxCollection = db.collection('content');
        // Check if the file exists in the collection

        if (contentID) {
            // console.log('ID : ', contentID)
            const existingFile = await mdxCollection.findOne({ _id: new ObjectId(contentID) });
            res.status(200).json({
                file: existingFile ? existingFile : '',
                status: existingFile ? 'File Exists' : 'Not Found',
                contents: undefined,
            });
        } else {
            const existingFile = await collection.findOne({ language, topicNo: topicNo ? topicNo : 1, subTopicNo: subTopicNo ? subTopicNo : 1, });
            if (existingFile) {
                const id = existingFile.content_id
                const fileContent = await mdxCollection.findOne({ _id: id });

                if (list) {
                    const contentList = await collection.find({ language }).toArray();
                    res.status(200).json({
                        file: fileContent ? fileContent : '',
                        status: fileContent ? 'File Exists' : 'Not Found',
                        contents: contentList,
                    });
                } else {
                    res.status(200).json({
                        file: fileContent ? fileContent : '',
                        status: fileContent ? 'File Exists' : 'Not Found',
                        contents: undefined,
                    });
                }

            } else {
                res.status(200).json({ file: '', status: 'Not Found', contents: undefined, });
            }
        }


    } catch (error) {
        console.error('Error file not found:', error);
        res.status(500).json({ file: '', status: 'error', contents: undefined, });
    } finally {
        // Close the MongoDB connection
        await client.close();
    }
}
