import React, { useState } from 'react';
import moment from 'moment';
import {
    Grid,
    Typography,
    Card,
    CardMedia,
    CardActionArea,
    CardContent,
    Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ImageWithLoader from '../../common/ImageWithLoader';

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

const CharacterCard = ({
    data
}) => {
    const classes = useStyles();
    const [showLoading, setLoading] = useState(true);
    const {
        status,
        species,
        gender,
        origin,
        location,
        image,
        name,
        id,
        created
    } = data;

    const characterData = [
        {
            label: 'STATUS',
            value: status
        },
        {
            label: 'SPECIES',
            value: species
        },
        {
            label: 'GENDER',
            value: gender
        },
        {
            label: 'ORIGIN',
            value: origin.name
        },
        {
            label: 'LAST LOCATION',
            value: location.name
        },
    ];

    const CharacterImage = () => (
        <Grid container className="r8y-character-image-container">
            <Grid item xs={12} style={{ position: 'relative', height: '250px' }}>
                <ImageWithLoader
                    src={image}
                    style={{ width: '100%', height: '100%' }}
                    alt="profile-img"
                    className="r8y-character-image"
                    showLoading={showLoading}
                    onLoadComplete={() => setLoading(false)}
                />
                <div className="w3-padding r8y-name-container">
                    <Typography className="w3-text-white w3-margin-bottom r8y-character-name" variant="h5">
                        {name}
                    </Typography>
                    <Typography className="w3-text-white" variant="body1">
                        {`id: ${id} - created ${moment(created).fromNow()}`}
                    </Typography>
                </div>
            </Grid>
        </Grid>
    );

    return (
        <Card className={`r8y-character-card ${classes.card}`}>
            <CardActionArea>
                <CardMedia
                    component={CharacterImage}
                    alt="image"
                    className={{ objectFit: 'cover' }}
                    height="300"
                    width="300"
                    image={data.image}
                    title="Character Image"
                />
                <CardContent className="r8y-card-content">
                    {characterData.map(eachData => (
                        <Grid container>
                            <Grid item xs={12} className="r8y-character-info">
                                <Grid container justify="space-between" spacing={1} wrap="nowrap">
                                    <Grid item xs={6}>
                                        <Typography component="p" variant="body2" className="r8y-word-break" style={{ color: 'rgb(158, 158, 158)' }}>{eachData.label}</Typography>
                                    </Grid>
                                    <Grid item xs={6} className="w3-right-align">
                                        <Typography component="p" variant="body2" className="r8y-word-break" color="primary">{eachData.value}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider style={{ color: 'rgb(68, 68, 68)' }} />
                            </Grid>
                        </Grid>
                    ))}
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CharacterCard;
