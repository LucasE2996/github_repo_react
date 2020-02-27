import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    a {
        color: #7159c1;
        font-size: 16px;
        text-decoration: none;
    }

    img {
        width: 120px;
        border-radius: 50%;
        margin-top: 20px;
    }

    h1 {
        font-size: 24px;
        margin-top: 10px;
    }

    p {
        margin-top: 5px;
        font-size: 14px;
        color: #444;
        line-height: 1.4;
        text-align: center;
        max-width: 400px;
    }
`;

export const IssueContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 427px;

    svg {
        animation: ${rotate} 2s linear infinite;
    }
`;

export const Loading = styled.div`
    color: #fff;
    font-size: 30px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const IssueList = styled.ul`
    width: 100%;
    margin-top: 30px;
    list-style: none;

    li {
        display: flex;
        padding: 15px 10px;
        border: 1px solid #eee;
        border-radius: 4px;

        & + li {
            margin-top: 10px;
        }

        img {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 2px solid #eee;
        }

        div {
            flex: 1;
            margin-left: 15px;

            a {
                text-decoration: none;
                color: #333;

                &:hover {
                    color: #7159c1;
                }
            }

            p {
                margin-top: 5px;
                font-size: 12px;
                color: #999;
            }
        }
    }
`;

export const Label = styled.span`
    font-weight: normal;
    background: ${props => props.textColor || '#555'};
    color: #444;
    border-radius: 2px;
    padding: 3px 4px 3px 1px;
    text-align: center;
    margin-left: 10px;
    font-size: 14px;
`;

export const ButtonRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
    border-top: 1px solid #eee;
    padding-top: 30px;
    margin-top: 30px;

    button {
        background: #7159c1;
        border: 0;
        padding: 5px 15px;
        margin-left: 10px;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        font-weight: bold;
        color: #fff;
    }
`;
