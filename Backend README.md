# Knowledge Assistant API Documentation

This document provides detailed information about the Knowledge Assistant API, including endpoints, request/response schemas, and usage examples.

## Base URL

The API is accessible at the configured host and port. By default, this is:

```
http://localhost:52034
```

The port can be configured using the `API_PORT` environment variable.

## Authentication

Currently, the API does not require authentication.

## API Endpoints

### Health Check

#### `GET /`

Check if the API is running.

**Response:**

```json
{
  "message": "Knowledge Assistant API is running"
}
```

#### `GET /health`

Check the health status of the API.

**Response:**

```json
{
  "status": "ok"
}
```

### Query Knowledge Base

#### `POST /query`

Query the knowledge base with a question.

**Request Schema:**

```json
{
  "question": "string",         // Required: The question to ask
  "strategy": "string",         // Optional: Query strategy to use (default: "Sentence_Window")
  "temperature": float,         // Optional: Controls randomness in the response (default: 0.7)
  "max_tokens": integer         // Optional: Maximum number of tokens in the response (default: 500)
}
```

**Available Query Strategies:**

- `Sentence_Window`: Uses surrounding sentences as context for better understanding
- `Basic_Retrieval`: Simple document retrieval without special processing
- `Simple_Chunking`: Splits text into chunks for analysis
- `Final_Response`: Combines results from all strategies

**Response Schema:**

```json
{
  "response": "string",         // The answer to the question
  "strategy": "string",         // The strategy used for the query
  "source_chunks": [            // Array of source chunks used to generate the response
    {
      "text": "string",         // The text content of the chunk
      "metadata": {             // Metadata about the chunk
        "file_name": "string",  // Name of the source file
        "page": integer,        // Page number (for PDFs)
        "window": "string",     // Context window (for Sentence_Window strategy)
        "chunk_id": integer     // Unique identifier for the chunk
      },
      "score": float            // Relevance score of the chunk
    }
  ]
}
```

**Example Request:**

```bash
curl -X POST http://localhost:52034/query \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What is the Voice Application Agent?",
    "strategy": "Sentence_Window",
    "temperature": 0.7,
    "max_tokens": 500
  }'
```

### Process Documents

#### `POST /process-documents`

Process documents in the specified directory using the selected strategy.

**Request Schema:**

```json
{
  "strategy": "string",         // Optional: Processing strategy to use (default: "Simple_Chunking")
  "directory": "string"         // Optional: Directory containing documents to process
}
```

**Available Processing Strategies:**

- `Sentence_Window`: Creates context windows around sentences for better understanding
- `Sentence_Splitter`: Maintains sentence integrity while splitting text
- `Simple_Chunking`: Basic text chunking approach
- `Default`: Default processing method (same as Simple_Chunking)

**Response Schema:**

```json
{
  "message": "string",          // Status message
  "strategy": "string"          // The strategy used for processing
}
```

**Example Request:**

```bash
curl -X POST http://localhost:52034/process-documents \
  -H "Content-Type: application/json" \
  -d '{
    "strategy": "Simple_Chunking",
    "directory": "/app/documents"
  }'
```

### Get Available Strategies

#### `GET /strategies/query`

Get a list of available query strategies.

**Response:**

```json
[
  "Sentence_Window",
  "Basic_Retrieval",
  "Simple_Chunking",
  "Final_Response"
]
```

#### `GET /strategies/processing`

Get a list of available document processing strategies.

**Response:**

```json
[
  "Sentence_Window",
  "Sentence_Splitter",
  "Simple_Chunking",
  "Default"
]
```

## Error Handling

The API returns standard HTTP status codes to indicate the success or failure of a request:

- `200 OK`: The request was successful
- `400 Bad Request`: The request was invalid (e.g., invalid strategy)
- `500 Internal Server Error`: An error occurred on the server
- `503 Service Unavailable`: The service is not available (e.g., query engine not initialized)

Error responses include a detail message explaining the error:

```json
{
  "detail": "Error message"
}
```

## Source Chunks

The `/query` endpoint returns source chunks that were used to generate the response. These chunks contain:

1. **Text**: The actual text content from the document
2. **Metadata**: Information about the source, including:
   - `file_name`: Name of the source file
   - `page`: Page number (for PDFs)
   - `window`: Context window (for Sentence_Window strategy)
   - `chunk_id`: Unique identifier for the chunk
3. **Score**: Relevance score indicating how well the chunk matches the query

Source chunks are particularly useful for:
- Verifying the accuracy of the response
- Providing attribution to the original source
- Understanding the context used to generate the response

## Environment Variables

The API can be configured using the following environment variables:

- `API_PORT`: Port to run the API on (default: 8000)
- `STREAMLIT_PORT`: Port to run the Streamlit UI on
- `WEAVIATE_URL`: URL of the Weaviate instance (default: http://localhost:8080)
- `USE_EMBEDDED_WEAVIATE`: Whether to use embedded Weaviate (default: false)
- `OPENAI_API_KEY`: OpenAI API key for embeddings and LLM functionality
- `DOCUMENTS_DIR`: Directory containing documents to process

## Integration with Frontend

The Streamlit frontend communicates with the API using the following methods:

1. **Query Knowledge Base**:
   - Sends a POST request to `/query` with the question and strategy
   - Displays the response and source chunks to the user

2. **Process Documents**:
   - Sends a POST request to `/process-documents` with the strategy and directory
   - Displays the processing result to the user

3. **Get Strategies**:
   - Fetches available strategies from `/strategies/query` and `/strategies/processing`
   - Populates dropdown menus in the UI

4. **Health Check**:
   - Periodically checks the API status using the `/` endpoint
   - Displays connection status in the UI

## Chat Functionality

The chat functionality is implemented in the Streamlit frontend rather than as a separate API endpoint. The frontend:

1. Uses the `/query` endpoint to send user questions and receive responses
2. Maintains chat history using the `ChatHistory` class
3. Displays chat messages in a conversational interface
4. Stores chat history in a JSON file for persistence

The chat history includes:
- User questions
- System responses
- Query strategies used
- Timestamps
- Metadata (including source chunks)

This approach allows for a stateless API while maintaining chat context in the frontend.