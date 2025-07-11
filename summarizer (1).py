
import re
from collections import defaultdict

def tokenize_sentences(text):
    """Splits text into sentences."""
    return re.split(r'(?<=[.!?])\s+', text)

def tokenize_words(text):
    """Splits text into words and converts to lowercase."""
    return re.findall(r'\b\w+\b', text.lower())

def calculate_word_frequencies(words):
    """Calculates frequency of each word."""
    freq = defaultdict(int)
    for word in words:
        freq[word] += 1
    return freq

def score_sentences(sentences, word_frequencies):
    """Scores sentences based on word frequencies."""
    sentence_scores = defaultdict(int)
    for i, sentence in enumerate(sentences):
        for word in tokenize_words(sentence):
            if word in word_frequencies:
                sentence_scores[i] += word_frequencies[word]
    return sentence_scores

def generate_summary(text, num_sentences=1):
    """Generates a summary by selecting top-scoring sentences."""
    sentences = tokenize_sentences(text)
    if not sentences:
        return ""
    words = tokenize_words(text)
    word_frequencies = calculate_word_frequencies(words)
    sentence_scores = score_sentences(sentences, word_frequencies)

    # Sort sentences by score in descending order
    sorted_sentences = sorted(sentence_scores.items(), key=lambda x: x[1], reverse=True)

    # Select top N sentences (or fewer if text is shorter)
    summary_sentences = []
    for i, _ in sorted_sentences[:min(num_sentences, len(sentences))]:
        summary_sentences.append(sentences[i])

    # Join sentences in their original order
    summary_sentences.sort(key=lambda s: sentences.index(s))
    return ' '.join(summary_sentences)

if __name__ == '__main__':
    test_text = """Micro text summarization is a challenging task, especially for short texts. Traditional methods often struggle with the lack of context. This project aims to develop a custom solution without relying on large transformer models. We will focus on extractive summarization techniques."""
    summary = generate_summary(test_text, num_sentences=2)
    print("Original Text:", test_text)
    print("\nSummary:", summary)

    test_text_single_sentence = "This is a single sentence." 
    summary_single = generate_summary(test_text_single_sentence, num_sentences=5)
    print("\nOriginal Text (single sentence):", test_text_single_sentence)
    print("Summary (single sentence, num_sentences=5):", summary_single)

    test_text_empty = "" 
    summary_empty = generate_summary(test_text_empty)
    print("\nOriginal Text (empty):", test_text_empty)
    print("Summary (empty):", summary_empty)


