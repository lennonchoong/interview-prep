# C++ Directory Checklist

Total notes: **363**


## Algorithms & Data Structures


### Graph Algorithms

- [x] Bellman-Ford
- [ ] Binary Lifting
- [ ] Dijkstra's
- [ ] Kosaraju's
- [ ] Topological Sorting
- [ ] Union Find

### Probabilistic Data Structures

- [ ] Approximate Quantiles
- [ ] Bloom Filter
- [ ] Count-Min Sketch
- [ ] HyperLogLog

### Range Queries

- [ ] Binary Indexed Tree
- [ ] Segment Tree

### String Algorithms

- [ ] KMP String Matching
- [ ] String Hashing & Rolling Hash

## C++


### Algorithms

- [ ] STL Algorithms

### Bit Manipulation

- [ ] Bit Manipulation & bitset

### Building

- [ ] Build Process
- [ ] inline, Linkage & ODR

### Classes

- [ ] Copy Elision & RVO
- [ ] Initialisation & Constructors
- [ ] Move semantics
- [ ] Rule of 1, 3 & 5

### Code Examples

- [ ] std expected
- [ ] std function
- [ ] std optional

### Compile-Time

- [ ] constexpr, consteval & constinit

### Concurrency


#### Design

- [ ] Amdahl's Law
- [ ] Avoiding Deadlocks
- [ ] Data Initialisation
- [ ] Exception Safety
- [ ] Performance
- [ ] Thread Safety in returning values

##### Lock Free Design

- [ ] Hazard Pointers
- [ ] Non-Blocking Data Structures
- [ ] Reference Counting
- [ ] SPSC Ring Buffer

##### Threadpool

- [ ] Avoiding Contention & Work Stealing
- [ ] Interruptible Condition Variables
- [ ] Interruptible Tasks
- [ ] Tasks Waiting on other Tasks
- [ ] Waitable Tasks

#### Primitives


##### Atomics

- [ ] Atomic Types
- [ ] CAS Weak vs Strong
- [ ] Fences
- [ ] Happens Before Relationship
- [ ] Hardware Interaction
- [ ] Memory Ordering & Model With Atomics
- [ ] Read Modify Write Operations
- [ ] Synchronises With Relationship

###### Memory Ordering Tags

- [ ] Acquire Release
- [ ] Consume
- [ ] Relaxed
- [ ] Sequential Consistency

##### Basic

- [ ] Locks, Guards & Mutexes
- [ ] Semaphores
- [ ] std scoped_lock Deadlock Prevention Algorithm
- [ ] Threads

##### Composed

- [ ] Condition Variables
- [ ] Futures
- [ ] Latches & Barriers
- [ ] Promises & Packaged Task
- [ ] std algorithm Execution Policies
- [ ] std async

##### Coroutines

- [ ] Async Computations with Coroutines
- [ ] Coroutines
- [ ] std generator
- [ ] Value Sequence With Coroutine Generator

### Const

- [ ] Const Correctness

### Containers

- [ ] Container Choice & Complexity
- [ ] Sequence Containers - array, deque, list
- [ ] std span
- [ ] std unordered_map & map
- [ ] std vector

### Enums

- [ ] Enum Class

### Exceptions

- [ ] Data Structures & noexcept
- [ ] Exceptions & Optimisation
- [ ] Levels of Exceptions

### Files & Streams

- [ ] File Reading & Writing
- [ ] Filesystem
- [ ] Streams

### Initialisation

- [ ] Initialisation Syntax & Aggregates
- [ ] Structured Bindings

### Iterators

- [ ] Iterators & Iterator Categories

### Lambdas

- [ ] Lambdas & Closures

### Low Latency

- [ ] Low-Latency C++ Idioms

### Memory

- [ ] Cache Aligned Structs
- [ ] Custom Allocators
- [ ] Memory APIs
- [ ] Memory Manipulation Functions
- [ ] Object Lifetime & RAII
- [ ] PMR
- [ ] std launder
- [ ] Storage Durations
- [ ] Storage Specifiers

### Namespaces

- [ ] Inline Namespaces for Versioning
- [ ] Unnamed Namespaces

### Numeric

- [ ] IEEE 754
- [ ] Integer Representation
- [ ] Normalized & Subnormal Floating Point Numbers
- [ ] Numerical Casting

### Operators

- [ ] Operator Overloading
- [ ] Three-Way Comparison (Spaceship)

### Patterns & Idioms

- [ ] Pimpl
- [ ] Singleton

### Polymorphism

- [ ] C style unions
- [ ] Dynamic Dispatch
- [ ] Multiple & Virtual Inheritance
- [ ] Runtime Polymorphism
- [ ] std any
- [ ] std variant
- [ ] v-tables
- [ ] Virtual Dispatch & Optimisation

### Ranges & Views

- [ ] Constrained Algorithms
- [ ] Custom Range Adaptors
- [ ] Views & Range Adaptors

### Smart Pointers

- [ ] Shared Pointer
- [ ] std make_shared
- [ ] std make_unique
- [ ] Unique Pointer
- [ ] Weak Pointer

### Strings

- [ ] std string & SSO
- [ ] std string_view

### Templates


#### Advanced

- [ ] auto&& Keyword
- [ ] decltype Operator
- [ ] declval
- [ ] Forwarding References
- [ ] Template Recursion
- [ ] Type Traits

#### Basics

- [ ] Friendship With Templates
- [ ] Introduction
- [ ] Specialisation & Instantiation Types
- [ ] Templates with Lambdas
- [ ] Types of Templates

#### Concepts & Constraints

- [ ] Concept Requirements
- [ ] Concepts
- [ ] Constraining Scenarios
- [ ] enable_if
- [ ] SFINAE
- [ ] Type Constraints With constexpr
- [ ] Type Constraints with void_t

#### Patterns & Idioms

- [ ] CRTP In Composite Design Pattern
- [ ] CRTP
- [ ] Mixins
- [ ] Type Erasure
- [ ] TypeLists

#### Resolution & Deduction

- [ ] Class Template Deduction
- [ ] Function Template Deduction
- [ ] Name Binding & Dependent Names

#### Variadic Templates

- [ ] Ellipsis Operator
- [ ] Variadic Templates

### Testing

- [ ] Google Mock
- [ ] Google Test

### Time

- [ ] Clocks
- [ ] Duration
- [ ] Time Point

### Tooling

- [ ] ASAN
- [ ] Perf
- [ ] Tooling & Profilers
- [ ] TSAN Advanced
- [ ] TSAN
- [ ] UBSAN

### Type Casting

- [ ] Casting

### Undefined Behaviour

- [ ] Undefined Behaviour

## CPU

- [ ] Cache Coherency - MESI Protocol
- [ ] Cache Indexing, Tagging & Lookups
- [ ] CPU Architecture
- [ ] CPU Branch Prediction & OOO Execution
- [ ] CPU Caching
- [ ] CPU Pipelining & Super Scalar CPUs
- [ ] CPU Prefetching
- [ ] Hyperthreads
- [ ] Northbridge Architecture (Legacy)
- [ ] NUMA
- [ ] Set Associativity
- [ ] SRAM & DRAM
- [ ] Thread Affinity
- [ ] TLB
- [ ] Transactional Memory

## Databases

- [ ] BASE vs ACID
- [ ] Normalisation vs Denormalisation
- [ ] OLTP vs OLAP and Column Stores

### Indexing


#### Geospatial

- [ ] Geohashes
- [ ] Quadtrees
- [ ] R-Trees

#### Inverted Search

- [ ] Inverted Indexes

#### NoSQL

- [ ] LSM Trees
- [ ] Memtable
- [ ] SS Table
- [ ] WAL

#### SQL

- [ ] B-Trees
- [ ] Composite Indexes

### Isolation & Consistency

- [ ] Multi Version Concurrency Control
- [ ] Transaction Isolation Levels

### Modelling Types

- [ ] Document Based
- [ ] Graph
- [ ] Key-Value Stores
- [ ] Relational
- [ ] Wide Column

### Pagination

- [ ] Pagination

### Patterns

- [ ] Dealing with Contention
- [ ] Scaling Reads
- [ ] Scaling Writes

### Time Series Databases

- [ ] Internals

### Vector Databases

- [ ] 1. Fundamentals
- [ ] 2. Indexing & ANN Algorithms
- [ ] 3. Internals & Query Execution
- [ ] 4. Use Cases & Limitations

## Distributed Systems


### Broadcast

- [ ] Broadcast Algorithms
- [ ] Broadcast Protocols
- [ ] Commutativity In Broadcasting
- [ ] State Machine Replication via Broadcasting

### Clocks

- [ ] Clocks
- [ ] Logical Time & Lamport Clocks
- [ ] NTP
- [ ] Ordering & Causality
- [ ] Vector Clocks

### Communication

- [ ] Byzantine Generals Problem
- [ ] RPC
- [ ] Two Generals Problem

### Consensus

- [ ] Consensus
- [ ] Raft
- [ ] Two-Phase Commit

### Consistency

- [ ] Conflict Resolution
- [ ] Eventual Consistency
- [ ] Google's Spanner
- [ ] Linearizability

### Distributed Transactions

- [ ] Distributed Transactions - SAGA vs 2PC

### Replication & Fault Tolerance

- [ ] CAP Theorem
- [ ] Quorums
- [ ] Replication & State Inconsistency Resolution

## Misc

- [ ] Compiler Optimisations
- [ ] Instrinsics
- [ ] Multithreading Optimisations

## Networking


### Application Layer

- [ ] HTTP
- [ ] SSE
- [ ] WebRTC
- [ ] WebSockets

### Transport Layer

- [ ] Data Corruption
- [ ] Head Of Line Blocking
- [ ] Networking Layers

#### TCP

- [ ] Exponential Backoff
- [ ] Flow & Congestion Control
- [ ] Four Way Termination
- [ ] Handshaking
- [ ] Keep Alives
- [ ] Loss & Duplicate Detection
- [ ] Multiplexing
- [ ] Nagle's Algorithm
- [ ] Retransmissions & Timeout

#### TLS

- [ ] TLS With Protocols
- [ ] TLS

#### UDP

- [ ] QUIC
- [ ] UDP

## OS


### Concurrency

- [ ] 2-Phase Locking
- [ ] Concurrency Bugs
- [ ] Condition Variables
- [ ] Deadlocks
- [ ] Event Loops
- [ ] Futexes
- [ ] Hoare Semantics vs Mesa Semantics
- [ ] Interrupts
- [ ] Lock-free Data Structures
- [ ] Multiprocessor Scheduling
- [ ] Mutexes
- [ ] Priority Inheritance & Inversion
- [ ] pthread API
- [ ] Reader-Writer Locks
- [ ] Scheduling
- [ ] Semaphores
- [ ] Threads

### IO

- [ ] Device Interfaces
- [ ] Disk Scheduling Algorithms
- [ ] Hard Disk Drive
- [ ] Page Cache
- [ ] RAID
- [ ] SSDs FTL
- [ ] SSDs

### Isolation

- [ ] Context Switching
- [ ] Kernel Mode & User Mode
- [ ] Process
- [ ] System Calls
- [ ] Traps

### Linux Directory & File System

- [ ] Caching & Buffering
- [ ] Checksums In Recovering Corrupted Data
- [ ] Crash Consistency
- [ ] Disk Failure Modes
- [ ] Fast File System
- [ ] File System Organisation
- [ ] Flushing Writes To Disk
- [ ] Free Space Organisation
- [ ] Hard Links vs Soft Links
- [ ] Linux File Interface
- [ ] Log Structured File Systems
- [ ] Memory Mapping

### Optimizations

- [ ] Copy-On-Write (COW)
- [ ] Direct Memory Access or Direct Cache Access

### Security

- [ ] Security Threats

### Virtual Memory

- [ ] Buddy Allocator
- [ ] Fragmentation
- [ ] Free Space Management
- [ ] Linux Address Space
- [ ] Page Replacement Policies
- [ ] Page Swaps
- [ ] Page Tables Advanced
- [ ] Paging
- [ ] Seg Faults
- [ ] Segmentation
- [ ] Virtual Memory

## System Design

- [ ] Consistent Hashing
- [ ] Metric Cheatsheet

### APIs

- [ ] API Paradigms

### Caching

- [ ] Caching Strategies
- [ ] Eviction Policies
- [ ] Issues with Caching
- [ ] Types of Caching

### Consistency

- [ ] 2 Phase Locking
- [ ] SAGA Pattern

### Handling Failures

- [ ] Circuit Breakers
- [ ] Idempotency
- [ ] Timeouts and Backoffs

### Load Balancing

- [ ] Client-Side Load Balancing
- [ ] Dedicated Load Balancing
- [ ] Load Balancing Algorithms

### Low Latency

- [ ] Kernel Bypass
- [ ] Low-Latency Design Principles
- [ ] Tail Latency and Jitter
- [ ] Time Synchronization

### Observability

- [ ] Observability

### Patterns

- [ ] Handling Large Blobs
- [ ] Managing Long Running Tasks
- [ ] Transactional Outbox and CDC

#### Multi-step Processes

- [ ] Durable Execution Engines
- [ ] Event Sourcing
- [ ] Managed Workflow Systems

### Rate Limiting

- [ ] Rate Limiting Algorithms

### Regionalisation & Latency

- [ ] CDNs
- [ ] Regional Partitioning

### Security

- [ ] Authentication and Authorization

### Sharding

- [ ] Challenges of Sharding
- [ ] Sharding in Modern Databases
- [ ] Sharding Strategies

### Trading

- [ ] FIX Protocol
- [ ] Market Data Feeds
- [ ] Order Books and Matching Engines

## Technologies


### Caching

- [ ] Memcached
- [ ] Redis

### Cassandra

- [ ] Consistency
- [ ] Data Model & Primary Keys
- [ ] Gossip & Fault Tolerance
- [ ] Partitioning & Replication
- [ ] Query Routing
- [ ] Storage Model
- [ ] When to Use It & Limitations

### Databases

- [ ] ClickHouse
- [ ] DynamoDB
- [ ] kdb+
- [ ] MySQL
- [ ] PostgreSQL

### Leader Election

- [ ] etcd
- [ ] Zookeeper

### Queues

- [ ] Kafka
- [ ] RabbitMQ

### Search

- [ ] Elasticsearch
