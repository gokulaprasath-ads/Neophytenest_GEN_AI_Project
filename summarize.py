from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from src.summarizer import generate_summary

summarize_bp = Blueprint('summarize', __name__)

@summarize_bp.route('/summarize', methods=['POST'])
@cross_origin()
def summarize_text():
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({'error': 'Text is required'}), 400
        
        text = data['text'].strip()
        if not text:
            return jsonify({'error': 'Text cannot be empty'}), 400
        
        # Get optional parameters
        num_sentences = data.get('num_sentences', 1)
        
        # Generate summary
        summary = generate_summary(text, num_sentences)
        
        return jsonify({
            'summary': summary,
            'original_length': len(text),
            'summary_length': len(summary)
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

