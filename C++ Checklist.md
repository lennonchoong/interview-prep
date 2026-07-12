# C++ Directory Checklist

Total notes: **382**


## Algorithms & Data Structures

- [x] Heaps & Priority Queues


### Dynamic Programming

- [ ] Longest Increasing Subsequence

### Graph Algorithms

- [x] Bellman-Ford
- [x] Binary Lifting
- [x] Dijkstra's
- [x] Kosaraju's
- [x] Topological Sorting
- [x] Union Find

### Probabilistic Data Structures

- [x] Approximate Quantiles
- [x] Bloom Filter
- [x] Count-Min Sketch
- [x] HyperLogLog

### Range Queries

- [x] Binary Indexed Tree
- [ ] Prefix Sums
- [x] Segment Tree

### String Algorithms

- [x] KMP String Matching
- [x] String Hashing & Rolling Hash

## C++


### Algorithms

- [x] STL Algorithms

### Bit Manipulation

- [x] Bit Manipulation & bitset

### Building

- [x] Build Process
- [x] inline, Linkage & ODR

### Classes

- [x] Copy Elision & RVO
- [x] Empty Base Optimisation
- [x] Initialisation & Constructors
- [x] Move semantics
- [x] Rule of 1, 3 & 5

### Code Examples

- [x] std expected
- [x] std function
- [x] std optional

### Compile-Time

- [x] constexpr, consteval & constinit

### Concurrency


#### Design

- [x] Amdahl's Law
- [x] Avoiding Deadlocks
- [x] Data Initialisation
- [x] Exception Safety
- [x] Performance
- [x] Thread Safety in returning values

##### Lock Free Design

- [x] Hazard Pointers
- [x] LMAX Disruptor
- [x] MPMC & MPSC Queues
- [x] Non-Blocking Data Structures
- [x] RCU & Epoch-Based Reclamation
- [x] Reference Counting
- [x] Seqlock
- [x] SPSC Ring Buffer

##### Threadpool

- [x] Avoiding Contention & Work Stealing
- [x] Interruptible Condition Variables
- [x] Interruptible Tasks
- [x] Tasks Waiting on other Tasks
- [x] Waitable Tasks

#### Primitives


##### Atomics

- [x] Atomic Types
- [x] CAS Weak vs Strong
- [x] Fences
- [x] Happens Before Relationship
- [x] Hardware Interaction
- [x] Memory Ordering & Model With Atomics
- [x] Read Modify Write Operations
- [x] Synchronises With Relationship

###### Memory Ordering Tags

- [x] Acquire Release
- [x] Consume
- [x] Relaxed
- [x] Sequential Consistency

##### Basic

- [x] Locks, Guards & Mutexes
- [x] Semaphores
- [x] std scoped_lock Deadlock Prevention Algorithm
- [x] Threads

##### Composed

- [x] Condition Variables
- [x] Futures
- [x] Latches & Barriers
- [x] Promises & Packaged Task
- [x] std algorithm Execution Policies
- [x] std async

##### Coroutines

- [x] Async Computations with Coroutines
- [x] Coroutines
- [x] std generator
- [x] Value Sequence With Coroutine Generator

### Const

- [x] Const Correctness

### Containers

- [x] Container Choice & Complexity
- [x] Intrusive Containers
- [x] Open Addressing & Flat Hash Maps
- [x] Sequence Containers - array, deque, list
- [x] std span
- [x] std unordered_map & map
- [x] std vector

### Design Patterns

#### Behavioral

- [x] Command
- [x] Observer
- [x] State
- [x] Strategy
- [x] Visitor

#### Creational

- [x] Builder
- [x] Factory Method & Abstract Factory
- [x] Prototype

#### Structural

- [x] Adapter
- [x] Decorator
- [x] Facade
- [x] Proxy

### Enums

- [x] Enum Class

### Exceptions

- [x] Data Structures & noexcept
- [x] Exceptions & Optimisation
- [x] Levels of Exceptions

### Files & Streams

- [x] File Reading & Writing
- [x] Filesystem
- [x] Streams

### Initialisation

- [x] Initialisation Syntax & Aggregates
- [x] Structured Bindings

### Iterators

- [x] Iterators & Iterator Categories

### Lambdas

- [x] Lambdas & Closures

### Language Model

- [x] C++ Abstract Machine
- [x] Sequencing & Evaluation Order

### Low Latency

- [x] Low-Latency C++ Idioms
- [x] Serialisation & Wire Formats

### Memory

- [x] Cache Aligned Structs
- [x] Custom Allocators
- [x] Memory APIs
- [x] Memory Manipulation Functions
- [x] Object Lifetime & RAII
- [x] PMR
- [x] std launder
- [x] Storage Durations
- [x] Storage Specifiers

### Namespaces

- [x] Inline Namespaces for Versioning
- [x] Unnamed Namespaces

### Numeric

- [x] Fixed-Point & Price Representation
- [x] Floating Point Error & Kahan Summation
- [x] IEEE 754
- [x] Integer Representation
- [x] Normalized & Subnormal Floating Point Numbers
- [x] Numerical Casting

### Operators

- [x] Operator Overloading
- [x] Three-Way Comparison (Spaceship)

### Patterns & Idioms

- [x] Copy and Swap
- [x] Pimpl
- [x] Singleton

### Polymorphism

- [x] C style unions
- [x] Dynamic Dispatch
- [x] Multiple & Virtual Inheritance
- [x] Runtime Polymorphism
- [x] std any
- [x] std variant
- [x] v-tables
- [x] Virtual Dispatch & Optimisation

### Ranges & Views

- [x] Constrained Algorithms
- [x] Custom Range Adaptors
- [x] Views & Range Adaptors

### Smart Pointers

- [x] Shared Pointer
- [x] std make_shared
- [x] std make_unique
- [x] Unique Pointer
- [x] Weak Pointer

### Strings

- [x] std string & SSO
- [x] std string_view

### Templates


#### Advanced

- [x] auto&& Keyword
- [x] decltype Operator
- [x] declval
- [x] Forwarding References
- [x] Template Recursion
- [x] Type Traits

#### Basics

- [x] Friendship With Templates
- [x] Introduction
- [x] Specialisation & Instantiation Types
- [x] Templates with Lambdas
- [x] Types of Templates

#### Concepts & Constraints

- [x] Concept Requirements
- [x] Concepts
- [x] Constraining Scenarios
- [x] enable_if
- [x] SFINAE
- [x] Type Constraints With constexpr
- [x] Type Constraints with void_t

#### Patterns & Idioms

- [x] CRTP In Composite Design Pattern
- [x] CRTP
- [x] Mixins
- [x] Type Erasure
- [x] TypeLists

#### Resolution & Deduction

- [x] Class Template Deduction
- [x] Function Template Deduction
- [x] Name Binding & Dependent Names

#### Variadic Templates

- [x] Ellipsis Operator
- [x] Variadic Templates

### Testing

- [x] Google Mock
- [x] Google Test

### Time

- [x] Clocks
- [x] Duration
- [x] Time Point

### Tooling

- [x] ASAN
- [x] Perf
- [x] Tooling & Profilers
- [x] TSAN Advanced
- [x] TSAN
- [x] UBSAN

### Type Casting

- [x] Casting

### Undefined Behaviour

- [x] Undefined Behaviour

## CPU

- [x] Cache Coherency - MESI Protocol
- [x] Cache Indexing, Tagging & Lookups
- [x] CPU Architecture
- [x] CPU Branch Prediction & OOO Execution
- [x] CPU Caching
- [x] CPU Pipelining & Super Scalar CPUs
- [x] CPU Prefetching
- [x] Hyperthreads
- [x] Northbridge Architecture (Legacy)
- [x] NUMA
- [x] Set Associativity
- [x] SRAM & DRAM
- [x] Thread Affinity
- [x] TLB
- [x] Transactional Memory

## Databases

- [x] BASE vs ACID
- [x] Normalisation vs Denormalisation
- [x] OLTP vs OLAP and Column Stores

### Indexing


#### Geospatial

- [x] Geohashes
- [x] Quadtrees
- [x] R-Trees

#### Inverted Search

- [x] Inverted Indexes

#### NoSQL

- [x] LSM Trees
- [x] Memtable
- [x] SS Table
- [x] WAL

#### SQL

- [x] B-Trees
- [x] Composite Indexes

### Isolation & Consistency

- [x] Multi Version Concurrency Control
- [x] Transaction Isolation Levels

### Modelling Types

- [x] Document Based
- [x] Graph
- [x] Key-Value Stores
- [x] Relational
- [x] Wide Column

### Pagination

- [x] Pagination

### Patterns

- [x] Dealing with Contention
- [x] Scaling Reads
- [x] Scaling Writes

### Time Series Databases

- [x] Internals

### Vector Databases

- [x] 1. Fundamentals
- [x] 2. Indexing & ANN Algorithms
- [x] 3. Internals & Query Execution
- [x] 4. Use Cases & Limitations

## Distributed Systems


### Broadcast

- [x] Broadcast Algorithms
- [x] Broadcast Protocols
- [x] Commutativity In Broadcasting
- [x] State Machine Replication via Broadcasting

### Clocks

- [x] Clocks
- [x] Logical Time & Lamport Clocks
- [x] NTP
- [x] Ordering & Causality
- [x] Vector Clocks

### Communication

- [x] Byzantine Generals Problem
- [x] RPC
- [x] Two Generals Problem

### Consensus

- [x] Consensus
- [x] Raft
- [x] Two-Phase Commit

### Consistency

- [x] Conflict Resolution
- [x] Eventual Consistency
- [x] Google's Spanner
- [x] Linearizability

### Distributed Transactions

- [x] Distributed Transactions - SAGA vs 2PC

### Replication & Fault Tolerance

- [x] CAP Theorem
- [x] Quorums
- [x] Replication & State Inconsistency Resolution

## Misc

- [x] Compiler Optimisations
- [x] Intrinsics
- [x] Multithreading Optimisations

## Networking


### Application Layer

- [x] HTTP
- [x] SSE
- [x] WebRTC
- [x] WebSockets

### Transport Layer

- [x] Data Corruption
- [x] Head Of Line Blocking
- [x] Networking Layers

#### TCP

- [x] Exponential Backoff
- [x] Flow & Congestion Control
- [x] Four Way Termination
- [x] Handshaking
- [x] Keep Alives
- [x] Loss & Duplicate Detection
- [x] Multiplexing
- [x] Nagle's Algorithm
- [x] Retransmissions & Timeout

#### TLS

- [x] TLS With Protocols
- [x] TLS

#### UDP

- [x] QUIC
- [x] UDP

## OS


### Concurrency

- [x] 2-Phase Locking
- [x] Concurrency Bugs
- [x] Condition Variables
- [x] Deadlocks
- [x] Event Loops
- [x] Futexes
- [x] Hoare Semantics vs Mesa Semantics
- [x] Interrupts
- [x] Lock-free Data Structures
- [x] Multiprocessor Scheduling
- [x] Mutexes
- [x] Priority Inheritance & Inversion
- [x] pthread API
- [x] Reader-Writer Locks
- [x] Scheduling
- [x] Semaphores
- [x] Threads

### IO

- [x] Device Interfaces
- [x] Disk Scheduling Algorithms
- [x] Hard Disk Drive
- [x] Page Cache
- [x] RAID
- [x] SSDs FTL
- [x] SSDs

### IPC

- [x] Shared Memory IPC

### Isolation

- [x] Context Switching
- [x] Kernel Mode & User Mode
- [x] Process
- [x] System Calls
- [x] Traps

### Linux Directory & File System

- [x] Caching & Buffering
- [x] Checksums In Recovering Corrupted Data
- [x] Crash Consistency
- [x] Disk Failure Modes
- [x] Fast File System
- [x] File System Organisation
- [x] Flushing Writes To Disk
- [x] Free Space Organisation
- [x] Hard Links vs Soft Links
- [x] Linux File Interface
- [x] Log Structured File Systems
- [x] Memory Mapping

### Optimizations

- [x] Copy-On-Write (COW)
- [x] Direct Memory Access or Direct Cache Access

### Security

- [x] Security Threats

### Virtual Memory

- [x] Buddy Allocator
- [x] Fragmentation
- [x] Free Space Management
- [x] Linux Address Space
- [x] Page Replacement Policies
- [x] Page Swaps
- [x] Page Tables Advanced
- [x] Paging
- [x] Seg Faults
- [x] Segmentation
- [x] Virtual Memory

## System Design

- [x] Consistent Hashing
- [x] Metric Cheatsheet

### APIs

- [x] API Paradigms

### Caching

- [x] Caching Strategies
- [x] Eviction Policies
- [x] Issues with Caching
- [x] Types of Caching

### Consistency

- [x] 2 Phase Locking
- [x] SAGA Pattern

### Handling Failures

- [x] Circuit Breakers
- [x] Idempotency
- [x] Timeouts and Backoffs

### Load Balancing

- [x] Client-Side Load Balancing
- [x] Dedicated Load Balancing
- [x] Load Balancing Algorithms

### Low Latency

- [x] Kernel Bypass
- [x] Low-Latency Design Principles
- [x] Tail Latency and Jitter
- [x] Time Synchronization

### Observability

- [x] Observability

### Patterns

- [x] Handling Large Blobs
- [x] Managing Long Running Tasks
- [x] Transactional Outbox and CDC

#### Multi-step Processes

- [x] Durable Execution Engines
- [x] Event Sourcing
- [x] Managed Workflow Systems

### Rate Limiting

- [x] Rate Limiting Algorithms

### Regionalisation & Latency

- [x] CDNs
- [x] Regional Partitioning

### Security

- [x] Authentication and Authorization

### Sharding

- [x] Challenges of Sharding
- [x] Sharding in Modern Databases
- [x] Sharding Strategies

### Trading

- [x] Exchange Architecture & Pre-Trade Risk
- [x] FIX Protocol
- [x] ITCH & OUCH Protocols
- [x] Market Data Feeds
- [x] Market Microstructure & Market Making
- [x] Order Books and Matching Engines
- [x] Order Types & Time In Force

## Technologies


### Caching

- [x] Memcached
- [x] Redis

### Cassandra

- [x] Consistency
- [x] Data Model & Primary Keys
- [x] Gossip & Fault Tolerance
- [x] Partitioning & Replication
- [x] Query Routing
- [x] Storage Model
- [x] When to Use It & Limitations

### Databases

- [x] ClickHouse
- [x] DynamoDB
- [x] kdb+
- [x] MySQL
- [x] PostgreSQL

### Leader Election

- [x] etcd
- [x] Zookeeper

### Queues

- [x] Kafka
- [x] RabbitMQ

### Search

- [x] Elasticsearch
