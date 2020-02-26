import React, { useState } from 'react';
import { FaGithubAlt, FaPlus } from 'react-icons/fa';

import api from '../../services/api';

import { Container, Form, SubmitButton } from './styles';

export default function Main() {
    const [newRepo, setNewRepo] = useState('');

    function handleInputChange(e) {
        setNewRepo(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await api.get(`/repos/${newRepo}`);

        console.log(response);
    }

    return (
        <Container>
            <h1>
                <FaGithubAlt />
                Repositórios
            </h1>

            <Form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Adicionar repositório"
                    value={newRepo}
                    onChange={handleInputChange}
                />
                <SubmitButton>
                    <FaPlus color="#fff" size={14} />
                </SubmitButton>
            </Form>
        </Container>
    );
}
