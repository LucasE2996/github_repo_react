import React, { useState, useEffect, Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner } from './styles';

export default function Repository({ match }) {
    const [repository, setRepository] = useState([]);
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getRepositoryData(repName) {
            return await Promise.all([
                api.get(`/repos/${repName}`),
                api.get(`/repos/${repName}/issues`, {
                    params: {
                        state: 'open',
                        per_page: 5,
                    },
                }),
            ]);
        }

        const repName = decodeURIComponent(match.params.name);

        getRepositoryData(repName).then(values => {
            const [repository, issues] = values;

            setRepository(repository.data);
            setIssues(issues.data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <Loading>Carregando...</Loading>;
    }

    return <Container>
        <Owner>
            <Link to="/">Voltar aos repositórios</Link>
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />
            <h1>{repository.name}</h1>
            <p>{repository.description}</p>
        </Owner>
    </Container>;
}

Repository.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            name: PropTypes.string,
        }),
    }).isRequired,
};
