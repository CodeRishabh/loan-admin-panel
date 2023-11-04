import { useEffect, useState } from 'react';
import { fetchAdmin, postAdmin, updateAdmin, uploadImage } from '../../../api';
import { useDispatch, useSelector } from 'react-redux';
import { onUpdateAdmin } from '../../../store/actions/index';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import storage from '../../../firebase';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
} from '@mui/material';

export default function AdminCard(props) {
    const [adminData, setData] = useState({
        id: "",
        bankAccountname: "",
        bankAccountNumber: "",
        bankIFSCCode: "",
        emailId: "",
        logo: ""
    })
    const [image, setImage] = useState('');
    const [url, setUrl] = useState('');
    const { adminDetails } = useSelector((state) => state.adminReducers);
    const dispatch = useDispatch();

    const upload = async () => {
        if (image == null)
            return;
            const storageRef = ref(storage, `/images/${image.name}`);
            const imageData = new FormData();
            imageData.append('image', image);
            try {
                const { imagePath } = await uploadImage(imageData);
                setUrl(imagePath);
                // setData({ ...adminData, logo: imagePath })
                try {
                    console.log("adminData ", adminData);
                    const admin = await updateAdmin(adminData.id, {...adminData, logo: imagePath });
                    console.log("admin ", admin);
                    dispatch(onUpdateAdmin(admin));
                } catch (error) {
                    console.log(error);
                }

            } catch (error) {
                console.log(error);
            }
    }

    useEffect(() => {
        console.log(adminDetails)
        if (adminDetails.length > 0) {
            const { _id, bankAccountNumber, bankAccountname, bankIFSCCode, emailId, logo } = adminDetails[0]
            setData({ ...adminData, id: _id, bankAccountNumber: bankAccountNumber, bankAccountname: bankAccountname, bankIFSCCode: bankIFSCCode, emailId: emailId, logo: logo })
        }
    }, [adminDetails])

    return (
        <Card {...props}>
            <CardContent>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Avatar
                        src={adminData.logo}
                        sx={{
                            height: 64,
                            mb: 2,
                            width: 64
                        }}
                    />
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h5"
                    >
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="body2"
                    >
                        Accountname : <strong>{adminData.bankAccountname}</strong>
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="body2"
                    >
                        AccountNumber : <strong>{adminData.bankAccountNumber}</strong>
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="body2"
                    >
                        IFSCCode : <strong>{adminData.bankIFSCCode}</strong>
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="body2"
                    >
                        Email : <strong>{adminData.emailId}</strong>
                    </Typography>

                </Box>
            </CardContent>
            <Divider />
            <CardActions>
                <input
                    type="file"
                    onChange={(e) => { setImage(e.target.files[0]) }}
                />
                <Button
                    color="primary"
                    fullWidth
                    variant="text"
                    onClick={upload}
                >
                    Upload picture
                </Button>
            </CardActions>
        </Card>
    );
}


