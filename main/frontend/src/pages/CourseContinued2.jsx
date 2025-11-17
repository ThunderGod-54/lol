import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CourseContinued2 = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [output, setOutput] = useState('');

  // Course data with lessons
  const courseData = {
    1: {
      title: 'Data Structures & Algorithms',
      lessons: [
        {
          title: 'Introduction to DSA',
          videoUrl: 'https://youtu.be/K5KVEU3aaeQ', // Placeholder for YouTube video
          description: 'Understanding the importance of data structures and algorithms in programming.',
          code: `#include <stdio.h>
int main() {
    printf("Hello, DSA!");
    return 0;
}`,
          expectedOutput: 'Hello, DSA!'
        },
        {
          title: 'Arrays and Strings',
          videoUrl: 'https://youtu.be/K5KVEU3aaeQ',
          description: 'Learn about arrays, strings, and basic operations.',
          code: `#include <stdio.h>
int main() {
    int arr[] = {1, 2, 3, 4, 5};
    printf("Array element: %d", arr[0]);
    return 0;
}`,
          expectedOutput: 'Array element: 1'
        },
        {
          title: 'Linked Lists',
          videoUrl: 'https://youtu.be/K5KVEU3aaeQ',
          description: 'Understanding linked lists and their operations.',
          code: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

int main() {
    struct Node* head = NULL;
    // Linked list implementation
    printf("Linked List Basics");
    return 0;
}`,
          expectedOutput: 'Linked List Basics'
        }
      ]
    },
    2: {
      title: 'Web Development Fundamentals',
      lessons: [
        {
          title: 'HTML Basics',
          videoUrl: '',
          description: 'Learn the fundamentals of HTML structure and elements.',
          code: `<!DOCTYPE html>
<html>
<head>
    <title>My Web Page</title>
</head>
<body>
    <h1>Hello, Web Development!</h1>
    <p>This is a paragraph.</p>
</body>
</html>`,
          expectedOutput: 'HTML rendered in browser'
        },
        {
          title: 'CSS Styling',
          videoUrl: '',
          description: 'Introduction to CSS for styling web pages.',
          code: `body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
}

h1 {
    color: #333;
    text-align: center;
}`,
          expectedOutput: 'CSS applied to page'
        },
        {
          title: 'JavaScript Fundamentals',
          videoUrl: '',
          description: 'Basic JavaScript concepts and syntax.',
          code: `function greet(name) {
    console.log('Hello, ' + name + '!');
}

greet('World');`,
          expectedOutput: 'Hello, World!'
        }
      ]
    },
    3: {
      title: 'Java Programming',
      lessons: [
        {
          title: 'Java Basics',
          videoUrl: '',
          description: 'Introduction to Java programming language.',
          code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`,
          expectedOutput: 'Hello, Java!'
        },
        {
          title: 'Object-Oriented Programming',
          videoUrl: '',
          description: 'Understanding classes, objects, and OOP concepts.',
          code: `public class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void display() {
        System.out.println("Name: " + name + ", Age: " + age);
    }
}`,
          expectedOutput: 'Person class defined'
        },
        {
          title: 'Exception Handling',
          videoUrl: '',
          description: 'Learn how to handle exceptions in Java.',
          code: `public class ExceptionExample {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero!");
        }
    }
}`,
          expectedOutput: 'Cannot divide by zero!'
        }
      ]
    },
    5: {
      title: 'Python Programming',
      lessons: [
        {
          title: 'Python Basics',
          videoUrl: '',
          description: 'Introduction to Python programming.',
          code: `print("Hello, Python!")

# Variables and data types
name = "Python"
version = 3.9
print(f"Welcome to {name} {version}")`,
          expectedOutput: `Hello, Python!
Welcome to Python 3.9`
        },
        {
          title: 'Control Structures',
          videoUrl: '',
          description: 'Learn about loops and conditional statements.',
          code: `# If-else statement
age = 18
if age >= 18:
    print("You are an adult")
else:
    print("You are a minor")

# For loop
for i in range(5):
    print(f"Count: {i}")`,
          expectedOutput: `You are an adult
Count: 0
Count: 1
Count: 2
Count: 3
Count: 4`
        },
        {
          title: 'Functions and Modules',
          videoUrl: '',
          description: 'Understanding functions and module imports.',
          code: `def greet(name):
    return f"Hello, {name}!"

def add_numbers(a, b):
    return a + b

result = add_numbers(5, 3)
print(greet("Python"))
print(f"5 + 3 = {result}")`,
          expectedOutput: `Hello, Python!
5 + 3 = 8`
        }
      ]
    }
  };

  const course = courseData[courseId];

  if (!course) {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <button
          onClick={() => navigate('/courses')}
          style={{
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            background: '#4facfe',
            color: 'white',
            fontSize: '1rem',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          Back to Courses
        </button>
        <h1>Course Not Found</h1>
        <p>The requested course could not be found.</p>
      </div>
    );
  }

  const currentLesson = course.lessons[selectedLesson];

  const runCode = () => {
    setOutput(currentLesson.expectedOutput);
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', minHeight: '100vh', background: '#F0EDEE' }}>
      <button
        onClick={() => navigate(`/courses-continued/${courseId}`)}
        style={{
          padding: '10px 20px',
          borderRadius: '5px',
          border: 'none',
          background: '#4facfe',
          color: 'white',
          fontSize: '1rem',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        Back to Course Overview
      </button>



      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '300px 1fr', gap: '20px' }}>
        {/* Sidebar with lessons */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '20px', color: '#1e3a8a' }}>
            {course.title}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {course.lessons.map((lesson, index) => (
              <button
                key={index}
                onClick={() => setSelectedLesson(index)}
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: selectedLesson === index ? '2px solid #4facfe' : '1px solid #d1d5db',
                  background: selectedLesson === index ? '#e0f2fe' : 'white',
                  color: selectedLesson === index ? '#4facfe' : '#374151',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                }}
              >
                {lesson.title}
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '20px', color: '#1e3a8a' }}>
            {currentLesson.title}
          </h1>

          {/* Video section */}
          {currentLesson.videoUrl ? (
            <div style={{
              width: '100%',
              height: '400px',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '20px',
              border: '2px solid #d1d5db'
            }}>
              <iframe
                width="100%"
                height="100%"
                src={getYouTubeEmbedUrl(currentLesson.videoUrl)}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div style={{
              width: '100%',
              height: '400px',
              background: '#f3f4f6',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              border: '2px dashed #d1d5db'
            }}>
              <div style={{ textAlign: 'center', color: '#6b7280' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="23 7 16 12 23 17 23 7"></polygon>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </svg>
                <p style={{ marginTop: '10px', fontSize: '1.1rem' }}>Video will be embedded here</p>
              </div>
            </div>
          )}

          {/* Description */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '10px', color: '#374151' }}>
              Description
            </h3>
            <p style={{ fontSize: '1.1rem', color: '#6b7280', lineHeight: '1.6' }}>
              {currentLesson.description}
            </p>
          </div>

          {/* Code section - only for programming courses */}
          {(courseId === '1' || courseId === '3' || courseId === '5') && (
            <div style={{ marginBottom: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#374151' }}>
                  Code Example
                </h3>
                <button
                  onClick={runCode}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    background: '#10b981',
                    color: 'white',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Run Code
                </button>
              </div>
              <div style={{
                background: '#1f2937',
                borderRadius: '8px',
                padding: '20px',
                fontFamily: 'Monaco, Consolas, monospace',
                fontSize: '0.9rem',
                color: '#e5e7eb',
                overflow: 'auto',
                whiteSpace: 'pre-wrap',
                textAlign: 'left'
              }}>
                {currentLesson.code}
              </div>
              {output && (
                <div style={{ marginTop: '15px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '5px' }}>
                    Output:
                  </h4>
                  <div style={{
                    background: '#f8fafc',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    padding: '10px',
                    fontFamily: 'Monaco, Consolas, monospace',
                    fontSize: '0.9rem',
                    color: '#1f2937',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {output}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
            <button
              onClick={() => setSelectedLesson(Math.max(0, selectedLesson - 1))}
              disabled={selectedLesson === 0}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                background: selectedLesson === 0 ? '#d1d5db' : '#4facfe',
                color: 'white',
                fontSize: '1rem',
                cursor: selectedLesson === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              Previous
            </button>
            <button
              onClick={() => setSelectedLesson(Math.min(course.lessons.length - 1, selectedLesson + 1))}
              disabled={selectedLesson === course.lessons.length - 1}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                background: selectedLesson === course.lessons.length - 1 ? '#d1d5db' : '#4facfe',
                color: 'white',
                fontSize: '1rem',
                cursor: selectedLesson === course.lessons.length - 1 ? 'not-allowed' : 'pointer'
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContinued2;
