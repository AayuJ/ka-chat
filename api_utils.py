"""
Utility functions to mock API endpoints for the Knowledge Assistant.
These functions can be replaced with actual API calls in production.
"""

from typing import Dict, List, Optional, Union
from dataclasses import dataclass
from enum import Enum
import json
from datetime import datetime


class QueryStrategy(str, Enum):
    SENTENCE_WINDOW = "Sentence_Window"
    BASIC_RETRIEVAL = "Basic_Retrieval"
    SIMPLE_CHUNKING = "Simple_Chunking"
    FINAL_RESPONSE = "Final_Response"


class ProcessingStrategy(str, Enum):
    SENTENCE_WINDOW = "Sentence_Window"
    SENTENCE_SPLITTER = "Sentence_Splitter"
    SIMPLE_CHUNKING = "Simple_Chunking"
    DEFAULT = "Default"


@dataclass
class ChunkMetadata:
    file_name: str
    page: Optional[int]
    window: Optional[str]
    chunk_id: int


@dataclass
class SourceChunk:
    text: str
    metadata: ChunkMetadata
    score: float


@dataclass
class QueryResponse:
    response: str
    strategy: str
    source_chunks: List[SourceChunk]


def health_check() -> Dict[str, str]:
    """Mock the health check endpoint (GET /)."""
    return {"message": "Knowledge Assistant API is running"}


def health_status() -> Dict[str, str]:
    """Mock the health status endpoint (GET /health)."""
    return {"status": "ok"}


def query_knowledge_base(
    question: str,
    strategy: str = QueryStrategy.SENTENCE_WINDOW,
    temperature: float = 0.7,
    max_tokens: int = 500
) -> QueryResponse:
    """
    Mock the query endpoint (POST /query).
    
    Args:
        question: The question to ask
        strategy: Query strategy to use
        temperature: Controls randomness in the response
        max_tokens: Maximum number of tokens in the response
    
    Returns:
        QueryResponse object containing the response and source chunks
    """
    # Mock response data
    mock_chunk = SourceChunk(
        text="This is a sample text chunk that would contain relevant information.",
        metadata=ChunkMetadata(
            file_name="sample.pdf",
            page=1,
            window="Context window around the relevant text",
            chunk_id=1
        ),
        score=0.95
    )

    return QueryResponse(
        response=f"Mock response to the question: {question}",
        strategy=strategy,
        source_chunks=[mock_chunk]
    )


def process_documents(
    strategy: str = ProcessingStrategy.SIMPLE_CHUNKING,
    directory: str = "/app/documents"
) -> Dict[str, str]:
    """
    Mock the process-documents endpoint (POST /process-documents).
    
    Args:
        strategy: Processing strategy to use
        directory: Directory containing documents to process
    
    Returns:
        Dictionary containing status message and strategy used
    """
    return {
        "message": f"Successfully processed documents in {directory}",
        "strategy": strategy
    }


def get_query_strategies() -> List[str]:
    """Mock the query strategies endpoint (GET /strategies/query)."""
    return [strategy.value for strategy in QueryStrategy]


def get_processing_strategies() -> List[str]:
    """Mock the processing strategies endpoint (GET /strategies/processing)."""
    return [strategy.value for strategy in ProcessingStrategy]


class APIError(Exception):
    """Custom exception for API errors."""
    def __init__(self, message: str, status_code: int = 500):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)


def validate_strategy(strategy: str, strategy_type: str) -> bool:
    """
    Validate if the provided strategy is valid.
    
    Args:
        strategy: Strategy to validate
        strategy_type: Type of strategy ('query' or 'processing')
    
    Returns:
        bool: True if strategy is valid, False otherwise
    
    Raises:
        APIError: If strategy is invalid
    """
    valid_strategies = {
        'query': [s.value for s in QueryStrategy],
        'processing': [s.value for s in ProcessingStrategy]
    }
    
    if strategy not in valid_strategies[strategy_type]:
        raise APIError(
            f"Invalid {strategy_type} strategy. Available strategies: {', '.join(valid_strategies[strategy_type])}",
            400
        )
    return True


# Example usage:
if __name__ == "__main__":
    # Example health check
    print("Health check:", health_check())
    
    # Example query
    try:
        response = query_knowledge_base(
            question="What is the Voice Application Agent?",
            strategy=QueryStrategy.SENTENCE_WINDOW
        )
        print("\nQuery response:", json.dumps(response.__dict__, indent=2))
    except APIError as e:
        print(f"Error ({e.status_code}): {e.message}")
    
    # Example processing documents
    print("\nProcessing documents:", process_documents())
    
    # Example getting strategies
    print("\nQuery strategies:", get_query_strategies())
    print("Processing strategies:", get_processing_strategies())