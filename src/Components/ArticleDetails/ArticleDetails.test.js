import ArticleDetails from './ArticleDetails';
import { screen, render } from '@testing-library/react';
import { rest } from 'msw';
import { server } from '../../mocks/server';

test('Test for mock API status code 200', async () => {
    render(<ArticleDetails articleId="1234" />);
    const element = await screen.findByText('Test Article');
    expect(element).toBeInTheDocument();
});

test('Display loading indicator while fetching', () => {
    render(<ArticleDetails articleId="1234" />);
    const loadingElement = screen.getByText(/loading article details/i);
    expect(loadingElement).toBeInTheDocument();
});

test('Handles API error silently (status code 500)', async () => {
    server.use(
        rest.get('http://localhost:3000/api/articles', (req, res, ctx) => {
            return res(ctx.status(500), ctx.json({ message: 'Internal Server Error' }));
        })
    );

    render(<ArticleDetails articleId="1234" />);
    const loadingElement = screen.getByText(/loading article details/i); // Expect it to stay in the loading state
    expect(loadingElement).toBeInTheDocument();
});
