import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import Container from '../../components/Container';
import {
    Loading,
    Owner,
    IssueList,
    Label,
    ButtonRow,
    IssueContent,
} from './styles';

export default function Repository({ match }) {
    const [repository, setRepository] = useState([]);
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [issueLoading, setIssueLoading] = useState(true);

    async function getRepositoryData(repName, state) {
        setIssueLoading(true);

        await Promise.all([
            api.get(`/repos/${repName}`),
            api.get(`/repos/${repName}/issues`, {
                params: {
                    state,
                    per_page: 5,
                },
            }),
        ])
            .then(values => {
                const [repositoryData, issuesData] = values;

                console.log(values);

                setRepository(repositoryData.data);
                setIssues(issuesData.data);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setIssueLoading(false);
                setLoading(false);
            });
    }

    useEffect(() => {
        const repName = decodeURIComponent(match.params.name);

        getRepositoryData(repName, 'open');
    }, []);

    if (loading) {
        return <Loading>Carregando...</Loading>;
    }

    return (
        <Container>
            <Owner>
                <Link to="/">Voltar aos repositórios</Link>
                <img
                    src={repository.owner.avatar_url}
                    alt={repository.owner.login}
                />
                <h1>{repository.name}</h1>
                <p>{repository.description}</p>
            </Owner>
            <ButtonRow>
                <button
                    type="button"
                    onClick={() =>
                        getRepositoryData(repository.full_name, 'open')
                    }
                >
                    Abertas
                </button>
                <button
                    type="button"
                    onClick={() =>
                        getRepositoryData(repository.full_name, 'closed')
                    }
                >
                    Fechadas
                </button>
            </ButtonRow>

            <IssueContent>
                {issueLoading ? (
                    <FaSpinner size={30} color="#444" />
                ) : (
                    <IssueList>
                        {issues.map(issue => (
                            <li key={String(issue.id)}>
                                <img
                                    src={issue.user.avatar_url}
                                    alt={issue.user.login}
                                />
                                <div>
                                    <strong>
                                        <a
                                            href={issue.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {issue.title}
                                        </a>
                                        {issue.labels.map(label => (
                                            <Label
                                                key={String(label.id)}
                                                textColor={`#${label.color}`}
                                            >
                                                {' '}
                                                {label.name}{' '}
                                            </Label>
                                        ))}
                                    </strong>
                                    <p>{issue.user.login}</p>
                                </div>
                            </li>
                        ))}
                    </IssueList>
                )}
            </IssueContent>
        </Container>
    );
}

Repository.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            name: PropTypes.string,
        }),
    }).isRequired,
};
