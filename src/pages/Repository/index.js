import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import api from '../../services/api';

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

    return <h1>Repository: {decodeURIComponent(match.params.name)}</h1>;
}

Repository.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            name: PropTypes.string,
        }),
    }).isRequired,
};
